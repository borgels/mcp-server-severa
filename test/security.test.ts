import { createHash } from 'node:crypto';
import { afterEach, describe, expect, it } from 'vitest';
import { SeveraClient } from '../src/severa/client.js';
import { findOperation } from '../src/severa/capabilities.js';
import {
  assertAllowedReadOperation,
  guidParam,
  hashPreparedRequest,
  pathParam,
  prepareSeveraRequest,
  verifyPreparedRequest,
  type PreparedSeveraRequest,
} from '../src/severa/requests.js';
import { assertAuthorized, HttpRequestError } from '../src/transports/http-helpers.js';

const originalEnv = { ...process.env };
const GUID = '00000000-0000-0000-0000-000000000000';

function preparePatch(): PreparedSeveraRequest {
  return prepareSeveraRequest({
    method: 'PATCH',
    path: `/v1/customers/${GUID}`,
    body: { name: 'Acme' },
    reason: 'Correct customer name',
  });
}

function resign(prepared: PreparedSeveraRequest): PreparedSeveraRequest {
  return { ...prepared, operationHash: hashPreparedRequest(prepared) };
}

describe('prepared request integrity', () => {
  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('accepts an untouched prepared request and re-derives catalog metadata', () => {
    const prepared = preparePatch();
    expect(prepared.expiresAt).toBeTruthy();
    const verified = verifyPreparedRequest(prepared, prepared.operationHash);
    expect(verified).toMatchObject({
      operation: 'PATCH /v1/customers/{guid}',
      operationId: 'Customers_PatchCustomer',
      risk: 'write',
    });
    expect(verified.scopes).toContain('customers:write');
  });

  it('rejects a prepared request whose method or path was changed', () => {
    const prepared = preparePatch();
    expect(() => verifyPreparedRequest({ ...prepared, method: 'DELETE' }, prepared.operationHash)).toThrow(/hash mismatch/);
    expect(() => verifyPreparedRequest({ ...prepared, path: `/v1/projects/${GUID}` }, prepared.operationHash)).toThrow(/hash mismatch/);
  });

  it('rejects caller-edited scopes or risk', () => {
    const prepared = preparePatch();
    expect(() => verifyPreparedRequest({ ...prepared, scopes: [] }, prepared.operationHash)).toThrow(/hash mismatch/);
  });

  it('rejects a hash recomputed without the server secret', () => {
    const prepared = { ...preparePatch(), method: 'DELETE' as const };
    const { operationHash: _ignored, ...payload } = prepared;
    const unkeyed = createHash('sha256').update(JSON.stringify(payload)).digest('hex');
    expect(() => verifyPreparedRequest({ ...prepared, operationHash: unkeyed }, unkeyed)).toThrow(/hash mismatch/);
  });

  it('rejects a request signed with a different secret', () => {
    process.env.SEVERA_PREPARE_SECRET = 'secret-one';
    const prepared = preparePatch();
    process.env.SEVERA_PREPARE_SECRET = 'secret-two';
    expect(() => verifyPreparedRequest(prepared, prepared.operationHash)).toThrow(/hash mismatch/);
  });

  it('rejects a mismatched confirmation hash', () => {
    const prepared = preparePatch();
    expect(() => verifyPreparedRequest(prepared, 'a'.repeat(64))).toThrow(/hash mismatch/);
  });

  it('re-derives the operation via the catalog instead of trusting supplied fields', () => {
    const prepared = resign({ ...preparePatch(), method: 'DELETE' });
    expect(() => verifyPreparedRequest(prepared, prepared.operationHash)).toThrow(/does not match/);
  });

  it('applies derived scopes and risk even if supplied values differ', () => {
    const prepared = resign({ ...preparePatch(), scopes: ['harmless:read'], risk: 'write' });
    const verified = verifyPreparedRequest(prepared, prepared.operationHash);
    expect(verified.scopes).toContain('customers:write');
    expect(verified.scopes).not.toContain('harmless:read');
  });

  it('rejects read operations and unknown paths at commit', () => {
    const read = resign({ ...preparePatch(), method: 'POST', path: '/v1/resourceallocations/allocations' });
    expect(() => verifyPreparedRequest(read, read.operationHash)).toThrow();
    const unknown = resign({ ...preparePatch(), path: '/v1/nothing-here' });
    expect(() => verifyPreparedRequest(unknown, unknown.operationHash)).toThrow(/not allowlisted/);
  });

  it('rejects expired prepared requests', () => {
    const prepared = preparePatch();
    const later = new Date(Date.parse(prepared.expiresAt) + 1000);
    expect(() => verifyPreparedRequest(prepared, prepared.operationHash, later)).toThrow(/expired/);
  });
});

describe('path template matching', () => {
  it.each([
    '/v1/customers/..',
    '/v1/customers/.',
    '/v1/customers/x?y',
    '/v1/customers/x#y',
    '/v1/customers/%2e%2e',
    '/v1/customers/x%2Fy',
    '/v1/customers/x\\y',
  ])('does not let a template parameter match %j', path => {
    expect(() => findOperation('GET', path)).toThrow();
    expect(() => assertAllowedReadOperation('GET', path)).toThrow();
    expect(() => prepareSeveraRequest({ method: 'PATCH', path, reason: 'x' })).toThrow();
  });

  it('still matches GUID, date and country-name parameters', () => {
    expect(findOperation('GET', `/v1/customers/${GUID}`).id).toBeTruthy();
  });
});

describe('path parameter guards', () => {
  it.each(['', '.', '..', 'a/b', 'a\\b', 'a?b', 'a#b', '%2e', 'a%2Fb'])('rejects path parameter %j', value => {
    expect(() => pathParam(value)).toThrow(/Invalid path parameter/);
  });

  it('accepts only GUIDs for GUID parameters', () => {
    expect(guidParam(GUID)).toBe(GUID);
    expect(() => guidParam('..')).toThrow();
    expect(() => guidParam('x?y')).toThrow();
    expect(() => guidParam(`${GUID}/../x`)).toThrow();
    expect(() => guidParam(undefined)).toThrow(/Missing/);
  });
});

describe('client base URL handling', () => {
  it('trims trailing slashes in linear time', () => {
    const start = Date.now();
    const client = new SeveraClient({ baseUrl: `https://api.severa.visma.com/rest-api${'/'.repeat(50_000)}` });
    expect(Date.now() - start).toBeLessThan(1000);
    expect(client).toBeInstanceOf(SeveraClient);
  });
});

describe('HTTP bearer token', () => {
  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('rejects wrong or differently sized tokens', () => {
    process.env.MCP_HTTP_TOKEN = 'secret';
    for (const authorization of ['Bearer secreT', 'Bearer s', 'Bearer secret-longer', '']) {
      expect(() => assertAuthorized({ headers: { authorization } } as never)).toThrow(HttpRequestError);
    }
    expect(() => assertAuthorized({ headers: { authorization: 'Bearer secret' } } as never)).not.toThrow();
  });
});
