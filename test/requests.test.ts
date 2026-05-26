import { describe, expect, it } from 'vitest';
import {
  assertAllowedReadOperation,
  assertPreparedRequestHash,
  prepareSeveraRequest,
} from '../src/severa/requests.js';
import { SEVERA_OPERATIONS } from '../src/severa/openapi-catalog.js';

describe('Severa request guards', () => {
  it('allowlists documented read operations and rejects writes in read mode', () => {
    expect(() => assertAllowedReadOperation('GET', '/v1/customers')).not.toThrow();
    expect(() => assertAllowedReadOperation('GET', '/v1/customers/00000000-0000-0000-0000-000000000000')).not.toThrow();
    expect(() => assertAllowedReadOperation('POST', '/v1/resourceallocations/allocations')).not.toThrow();
    expect(() => assertAllowedReadOperation('POST', '/v1/customers')).toThrow(/not read-only/);
  });

  it('prepares documented writes with a stable hash', () => {
    const prepared = prepareSeveraRequest({
      method: 'PATCH',
      path: '/v1/customers/00000000-0000-0000-0000-000000000000',
      body: { name: 'Acme' },
      reason: 'Correct customer name',
    });

    expect(prepared.operation).toBe('PATCH /v1/customers/{guid}');
    expect(prepared.operationId).toBe('Customers_PatchCustomer');
    expect(prepared.scopes).toContain('customers:write');
    expect(prepared.operationHash).toHaveLength(64);
    expect(() => assertPreparedRequestHash(prepared, prepared.operationHash)).not.toThrow();
    expect(() => assertPreparedRequestHash({ ...prepared, reason: 'changed' }, prepared.operationHash)).toThrow(/hash mismatch/);
  });

  it('marks deletes as destructive prepared requests', () => {
    const prepared = prepareSeveraRequest({
      method: 'DELETE',
      path: '/v1/customers/00000000-0000-0000-0000-000000000000',
      reason: 'Remove duplicate customer',
    });

    expect(prepared.risk).toBe('destructive');
  });

  it('guards every generated OpenAPI operation without ambiguous matches', () => {
    const failures: unknown[] = [];

    for (const operation of SEVERA_OPERATIONS) {
      const path = samplePath(operation.path);
      try {
        if (operation.risk === 'read') {
          assertAllowedReadOperation(operation.method, path);
          continue;
        }

        const prepared = prepareSeveraRequest({
          method: operation.method,
          path,
          body: {},
          reason: 'catalog dry-run guard probe',
        });
        if (prepared.operationId !== operation.id) {
          failures.push({
            id: operation.id,
            method: operation.method,
            path: operation.path,
            matchedOperationId: prepared.operationId,
          });
        }
      } catch (error) {
        failures.push({
          id: operation.id,
          method: operation.method,
          path: operation.path,
          risk: operation.risk,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    expect(failures).toEqual([]);
  });
});

function samplePath(path: string): string {
  return path
    .replace(/\{date\}/g, '2026-01-01')
    .replace(/\{code2\}/g, 'DK')
    .replace(/\{code3\}/g, 'DNK')
    .replace(/\{countryName\}/g, 'Denmark')
    .replace(/\{[^}]+\}/g, '00000000-0000-0000-0000-000000000000');
}
