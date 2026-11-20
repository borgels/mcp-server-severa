import { afterEach, describe, expect, it, vi } from 'vitest';
import { formatUnknownError, redactSecrets, SeveraHttpError } from '../src/errors.js';
import { SeveraClient } from '../src/severa/client.js';

const originalEnv = { ...process.env };

describe('SeveraClient', () => {
  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('fetches and caches OAuth client credentials tokens', async () => {
    const fetchMock = vi.fn<typeof fetch>(async input => {
      const url = String(input);
      if (url.endsWith('/v1/login/oauth/token')) {
        return Response.json({ access_token: 'issued-token-0000000001', expires_in: 3600, scope: 'customers:read' });
      }
      return Response.json({ ok: true }, { headers: { NextPageToken: 'next-page' } });
    });
    const client = new SeveraClient({
      clientId: 'client-id',
      clientSecret: 'client-secret',
      scope: 'customers:read',
      baseUrl: 'https://example.test',
      fetchImpl: fetchMock as unknown as typeof fetch,
    });

    const first = await client.get('/v1/customers', { customerNames: ['Acme'], rowCount: 20 });
    await client.get('/v1/projects');

    expect(first.nextPageToken).toBe('next-page');
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(fetchMock.mock.calls[0]?.[1]?.body).toContain('"grant_type":"client_credentials"');
    expect(fetchMock.mock.calls[1]?.[1]?.headers).toMatchObject({
      Accept: 'application/json',
      Authorization: 'Bearer issued-token-0000000001',
    });
    expect(String(fetchMock.mock.calls[1]?.[0])).toContain('customerNames=Acme');
  });

  it('can use externally managed access tokens without requesting OAuth tokens', async () => {
    const fetchMock = vi.fn<typeof fetch>(async () => Response.json({ ok: true }));
    const client = new SeveraClient({
      accessToken: 'static-token',
      baseUrl: 'https://example.test',
      fetchImpl: fetchMock as unknown as typeof fetch,
    });

    await client.get('/heartbeat/authorized');

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock.mock.calls[0]?.[1]?.headers).toMatchObject({
      Authorization: 'Bearer static-token',
    });
  });

  it('rejects unsafe credential transport URLs', () => {
    expect(() => new SeveraClient({ accessToken: 'token', baseUrl: 'http://api.example.test' })).toThrow(/Refusing/);
    expect(() => new SeveraClient({ accessToken: 'token', baseUrl: 'http://127.0.0.1:4010' })).not.toThrow();
  });

  it('formats API errors in our own words, with the status first and nothing of the body', async () => {
    const error = new SeveraHttpError({
      status: 401,
      method: 'GET',
      url: 'https://example.test/v1/customers',
      requestId: 'vendor-request-id',
    });

    expect(error.message).toBe(
      'Severa API request failed with HTTP 401 | Severa rejected the access token (expired or revoked). A new token is requested on the next call.',
    );
    expect(formatUnknownError(error)).not.toContain('vendor-request-id');
    expect(redactSecrets('SEVERA_CLIENT_SECRET=abc Authorization: Bearer xyz')).toContain('[REDACTED]');
  });

  it('words a failed token request as our own text, never quoting the answer', async () => {
    const client = new SeveraClient({
      clientId: 'client-id-0123456789',
      clientSecret: 'client-secret-0123456789',
      baseUrl: 'https://example.test',
      credentialEnv: {},
      fetchImpl: (async () =>
        Response.json({ error: 'invalid_client', error_description: 'client-secret-0123456789 unknown' }, { status: 401 })) as unknown as typeof fetch,
    });
    const error = (await client.get('/v1/customers').catch((e: unknown) => e)) as Error;
    expect(error.message).toBe(
      'Severa API request failed with HTTP 401 | Severa refused the client credentials (invalid, revoked, or without the requested scope). Retrying will not help.',
    );
  });
});

describe('SeveraClient hardening', () => {
  const savedTimeout = process.env.SEVERA_TIMEOUT_MS;
  afterEach(() => {
    if (savedTimeout === undefined) {
      delete process.env.SEVERA_TIMEOUT_MS;
    } else {
      process.env.SEVERA_TIMEOUT_MS = savedTimeout;
    }
  });

  it('never follows redirects and reports them as errors', async () => {
    const calls: RequestInit[] = [];
    const client = new SeveraClient({
      clientId: 'id', clientSecret: 'secret-value',
      fetchImpl: (async (_url: string, init: RequestInit) => {
        calls.push(init);
        return new Response(null, { status: 302, headers: { location: 'https://elsewhere.example/' } });
      }) as unknown as typeof fetch,
    });
    await expect(client.get('/v1/customers')).rejects.toThrow(/302/);
    expect(calls.length).toBeGreaterThan(0);
    expect(calls.every(init => init.redirect === 'manual')).toBe(true);
  });

  it('never reads an error body', async () => {
    let read = false;
    const client = new SeveraClient({
      accessToken: 'static-token-value',
      baseUrl: 'https://example.test',
      fetchImpl: (async () => ({
        ok: false,
        status: 500,
        headers: new Headers(),
        body: null,
        text: async () => {
          read = true;
          return 'vendor diagnostic';
        },
        json: async () => {
          read = true;
          return {};
        },
      })) as unknown as typeof fetch,
    });
    const error = (await client.get('/v1/customers').catch((e: unknown) => e)) as Error;
    expect(error.message).toBe('Severa API request failed with HTTP 500');
    expect(read).toBe(false);
  });

  it('rejects an invalid SEVERA_TIMEOUT_MS instead of using NaN', () => {
    process.env.SEVERA_TIMEOUT_MS = '30s';
    expect(() => new SeveraClient()).toThrow(/SEVERA_TIMEOUT_MS/);
    process.env.SEVERA_TIMEOUT_MS = '5000';
    expect(() => new SeveraClient()).not.toThrow();
  });
});
