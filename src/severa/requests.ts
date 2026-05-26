import { createHash } from 'node:crypto';
import type { SeveraHttpMethod, SeveraQueryValue } from './client.js';
import { findOperation } from './capabilities.js';

export interface PreparedSeveraRequest {
  type: 'severa_prepared_request';
  createdAt: string;
  method: Exclude<SeveraHttpMethod, 'GET'>;
  path: string;
  query: Record<string, SeveraQueryValue>;
  body?: unknown;
  reason: string;
  operation: string;
  operationId: string;
  scopes: string[];
  risk: 'write' | 'destructive';
  operationHash: string;
}

export function prepareSeveraRequest(input: {
  method: string;
  path: string;
  query?: Record<string, SeveraQueryValue>;
  body?: unknown;
  reason: string;
}): PreparedSeveraRequest {
  const method = input.method.toUpperCase();
  if (!isMutationMethod(method)) {
    throw new Error('Prepared Severa requests support POST, PUT, PATCH, and DELETE. Use severa_rest_read for read operations.');
  }

  const path = normalizePath(input.path);
  const operation = findOperation(method, path);
  if (operation.risk === 'read') {
    throw new Error(`Use severa_rest_read for read-style operation: ${operation.id}`);
  }

  const preparedWithoutHash = {
    type: 'severa_prepared_request' as const,
    createdAt: new Date().toISOString(),
    method,
    path,
    query: input.query ?? {},
    body: input.body,
    reason: input.reason,
    operation: `${method} ${operation.path}`,
    operationId: operation.id,
    scopes: [...operation.scopes],
    risk: operation.risk,
  };

  return {
    ...preparedWithoutHash,
    operationHash: hashPreparedRequest(preparedWithoutHash),
  };
}

export function assertPreparedRequestHash(prepared: PreparedSeveraRequest, confirmOperationHash: string): void {
  const actualHash = hashPreparedRequest(prepared);
  if (actualHash !== prepared.operationHash || actualHash !== confirmOperationHash) {
    throw new Error('Prepared Severa request hash mismatch. Re-run preparation and inspect the operation.');
  }
}

export function assertAllowedReadOperation(method: string, path: string): void {
  const operation = findOperation(method, path);
  if (operation.risk !== 'read') {
    throw new Error(`Severa operation is not read-only: ${operation.method} ${operation.path}`);
  }
}

export function hashPreparedRequest(
  prepared: Omit<PreparedSeveraRequest, 'operationHash'> | PreparedSeveraRequest,
): string {
  const { operationHash: _operationHash, ...payload } = prepared as PreparedSeveraRequest;
  return stableHash(payload);
}

export function normalizePath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

export function operationPattern(path: string): string {
  return normalizePath(path).replace(
    /\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}(?=\/|$)/gi,
    '/{guid}',
  );
}

function isMutationMethod(method: string): method is PreparedSeveraRequest['method'] {
  return method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE';
}

function stableJson(value: unknown): string {
  return JSON.stringify(sortValue(value));
}

function sortValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortValue);
  }

  if (!value || typeof value !== 'object') {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .filter(([, item]) => item !== undefined)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => [key, sortValue(item)]),
  );
}

function stableHash(value: unknown): string {
  return createHash('sha256').update(stableJson(value)).digest('hex');
}
