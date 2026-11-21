// Failure metadata on gateway error results: Severa's HTTP status and its request id (a UUID or hex id only), for a
// host that counts failures without reading their text. Never the body, Severa's code or message.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { failureMetadata, requestIdFrom, SeveraHttpError, vendorRequestId } from '../src/errors.js';
import { createSeveraGateway } from '../src/gateway.js';

const ID = 'qqqqwwwwzzzzxxxx1';
const SECRET = 'jjjjkkkkvvvvyyyy2';
const ISSUED = 'ttttuuuuffffhhhh5';
const BASE = 'https://severa.example.test/rest-api';
const UUID = '3f2b8c1e-9a4d-4e6f-8b7a-1c2d3e4f5a6b';
const BODY = { message: 'Customer Jane Doe not found', code: 'E_NOPE' };

beforeEach(() => {
  vi.unstubAllEnvs();
});

afterEach(() => {
  vi.unstubAllEnvs();
});

function json(payload: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(payload), { status, headers: { 'content-type': 'application/json', ...headers } });
}

function isTokenRequest(url: unknown): boolean {
  return new URL(String(url)).pathname.endsWith('/v1/login/oauth/token');
}

/** A Severa that issues a token and answers every other request with `status`, `headers` and `body`. */
function gatewayAnswering(
  status: number,
  headers: Record<string, string>,
  body: unknown = BODY,
  credentials = { clientId: ID, clientSecret: SECRET },
) {
  const fetchImpl = vi.fn<typeof fetch>(async url =>
    isTokenRequest(url) ? json({ access_token: ISSUED, token_type: 'Bearer', expires_in: 3600 }) : json(body, status, headers),
  );
  return createSeveraGateway({ ...credentials, baseUrl: BASE, fetchImpl });
}

describe('vendorRequestId', () => {
  it('keeps a UUID and a hex id', () => {
    expect(vendorRequestId(UUID)).toBe(UUID);
    expect(vendorRequestId(` ${UUID} `)).toBe(UUID);
    expect(vendorRequestId('a1b2c3d4e5f60718')).toBe('a1b2c3d4e5f60718');
    expect(vendorRequestId('ABCDEF12-3456')).toBe('ABCDEF12-3456');
    expect(vendorRequestId('f'.repeat(64))).toBe('f'.repeat(64));
  });

  it('drops anything that could be text, and the shape of a personal number', () => {
    for (const value of [
      undefined,
      null,
      '',
      'abc123',
      'Jane Doe',
      'jane@example.com',
      'req_8f3a9c2d1e',
      'vendor-request-id',
      'deadbeef deadbeef',
      '0101901234',
      'ab-010190-1234-cd',
      'f'.repeat(65),
      '-abcdef12',
      'abcdef12-',
      'a-------',
      'abc--def',
      'abcd--ef12',
      'abcdef12-ab',
      'abcdef1',
      'abcdef12-'.repeat(8),
    ]) {
      expect(vendorRequestId(value)).toBeUndefined();
    }
  });

  it('reads the first header that has an id in the right form', () => {
    expect(requestIdFrom(new Headers({ 'x-request-id': 'not an id', 'request-id': UUID }))).toBe(UUID);
    expect(requestIdFrom(new Headers({ 'x-correlation-id': 'deadbeefcafe' }))).toBe('deadbeefcafe');
    expect(requestIdFrom(new Headers({ 'x-vendor-id': UUID }))).toBeUndefined();
    expect(requestIdFrom(new Headers({ 'x-vendor-id': UUID }), ['x-vendor-id'])).toBe(UUID);
  });

  it('gives metadata for an HTTP error only', () => {
    const http = (requestId?: string) =>
      new SeveraHttpError({ status: 404, method: 'GET', url: `${BASE}/v1/customers`, requestId });
    expect(failureMetadata(http(UUID))).toEqual({ httpStatus: 404, requestId: UUID });
    expect(failureMetadata(http('Jane Doe'))).toEqual({ httpStatus: 404 });
    expect(http('Jane Doe').requestId).toBeUndefined();
    expect(failureMetadata(new Error('boom'))).toBeUndefined();
    expect(failureMetadata('boom')).toBeUndefined();
  });
});

describe('gateway error results', () => {
  it('carry the HTTP status and the request id, never the body', async () => {
    const result = await gatewayAnswering(404, { 'x-request-id': UUID }).callTool('search_customers', {});
    expect(result.isError).toBe(true);
    expect(result.failure).toEqual({ httpStatus: 404, requestId: UUID });
    const serialised = JSON.stringify(result);
    expect(serialised).not.toContain('Jane Doe');
    expect(serialised).not.toContain('E_NOPE');
  });

  it('carry the status and request id of a failed token request', async () => {
    const fetchImpl = vi.fn<typeof fetch>(async () =>
      json({ error: 'invalid_client', error_description: `unknown client ${ID}` }, 401, { 'request-id': UUID }),
    );
    const result = await createSeveraGateway({ clientId: ID, clientSecret: SECRET, baseUrl: BASE, fetchImpl }).callTool(
      'search_customers',
      {},
    );
    expect(result.isError).toBe(true);
    expect(result.failure).toEqual({ httpStatus: 401, requestId: UUID });
    expect(JSON.stringify(result)).not.toContain('invalid_client');
  });

  it('carry the status and request id of a refused redirect', async () => {
    const fetchImpl = vi.fn<typeof fetch>(async url =>
      isTokenRequest(url)
        ? json({ access_token: ISSUED, token_type: 'Bearer', expires_in: 3600 })
        : new Response(null, { status: 302, headers: { location: 'https://elsewhere.example.test/', 'x-request-id': UUID } }),
    );
    const result = await createSeveraGateway({ clientId: ID, clientSecret: SECRET, baseUrl: BASE, fetchImpl }).callTool(
      'search_customers',
      {},
    );
    expect(result.isError).toBe(true);
    expect(result.failure).toEqual({ httpStatus: 302, requestId: UUID });
    expect(JSON.stringify(result)).not.toContain('elsewhere');
  });

  it('carry the status alone when the request id is not in the form of one', async () => {
    const result = await gatewayAnswering(422, { 'x-request-id': 'Jane Doe <jane@example.com>' }).callTool(
      'search_customers',
      {},
    );
    expect(result.failure).toEqual({ httpStatus: 422 });
    expect(JSON.stringify(result)).not.toContain('jane@example.com');
  });

  it('drop a request id that holds a piece of a credential', async () => {
    // The client secret's own hex-looking piece as the id: redaction changes it, and the changed value is no id.
    const result = await gatewayAnswering(500, { 'x-request-id': 'deadbeef00112233' }, {}, {
      clientId: ID,
      clientSecret: 'deadbeef00112233-sec-0',
    }).callTool('search_customers', {});
    expect(result.isError).toBe(true);
    expect(result.failure).toEqual({ httpStatus: 500 });
    expect(JSON.stringify(result)).not.toContain('deadbeef0011');
  });

  it('have no metadata when the cause is not Severa answering with an HTTP error', async () => {
    const gw = gatewayAnswering(200, {});
    expect((await gw.callTool('no_such_tool', {})).failure).toBeUndefined();
    const invalid = await gw.callTool('search_customers', { noSuchField: true });
    expect(invalid.isError).toBe(true);
    expect(invalid.failure).toBeUndefined();
    const offline = createSeveraGateway({
      clientId: ID,
      clientSecret: SECRET,
      baseUrl: BASE,
      fetchImpl: (async () => {
        throw new TypeError('fetch failed');
      }) as typeof fetch,
    });
    const result = await offline.callTool('search_customers', {});
    expect(result.isError).toBe(true);
    expect(result.failure).toBeUndefined();
  });

  it('are absent on a successful result', async () => {
    const result = await gatewayAnswering(200, { 'x-request-id': UUID }, [{ guid: UUID, name: 'Testfirma ApS' }]).callTool(
      'search_customers',
      {},
    );
    expect(result.isError).toBeUndefined();
    expect(result.failure).toBeUndefined();
  });
});
