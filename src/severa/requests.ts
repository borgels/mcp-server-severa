import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import type { SeveraHttpMethod, SeveraQueryValue } from './client.js';
import { findOperation } from './capabilities.js';

export interface PreparedSeveraRequest {
  type: 'severa_prepared_request';
  createdAt: string;
  expiresAt: string;
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

  const createdAt = new Date();
  const preparedWithoutHash = {
    type: 'severa_prepared_request' as const,
    createdAt: createdAt.toISOString(),
    expiresAt: new Date(createdAt.getTime() + PREPARED_REQUEST_TTL_MS).toISOString(),
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

/**
 * Verify a prepared request at commit time: the HMAC signature must come from
 * this server and match the confirmation hash, the request must be unexpired,
 * and operation, operationId, scopes and risk are re-derived from the catalog
 * via method + path. Returns the request carrying the derived values.
 */
export function verifyPreparedRequest(
  prepared: PreparedSeveraRequest,
  confirmOperationHash: string,
  now: Date = new Date(),
): PreparedSeveraRequest {
  const expected = Buffer.from(hashPreparedRequest(prepared), 'hex');
  const given = Buffer.from(String(prepared.operationHash ?? ''), 'hex');
  const confirm = Buffer.from(String(confirmOperationHash ?? ''), 'hex');
  if (
    expected.length !== given.length ||
    !timingSafeEqual(expected, given) ||
    expected.length !== confirm.length ||
    !timingSafeEqual(expected, confirm)
  ) {
    throw new Error('Prepared Severa request hash mismatch. Re-run preparation and inspect the operation.');
  }

  const expiresAt = Date.parse(prepared.expiresAt);
  if (!Number.isFinite(expiresAt) || now.getTime() > expiresAt) {
    throw new Error('Prepared Severa request has expired (15 minutes). Re-run preparation.');
  }

  const method = String(prepared.method).toUpperCase();
  if (!isMutationMethod(method)) {
    throw new Error('Prepared Severa requests support POST, PUT, PATCH, and DELETE.');
  }

  const path = normalizePath(prepared.path);
  const catalogOperation = findOperation(method, path);
  if (catalogOperation.risk === 'read') {
    throw new Error(`Use severa_rest_read for read-style operation: ${catalogOperation.id}`);
  }

  const operation = `${method} ${catalogOperation.path}`;
  if (operation !== prepared.operation || catalogOperation.id !== prepared.operationId) {
    throw new Error('Prepared Severa request operation does not match its method and path.');
  }

  return {
    ...prepared,
    method,
    path,
    operation,
    operationId: catalogOperation.id,
    scopes: [...catalogOperation.scopes],
    risk: catalogOperation.risk,
  };
}

/** @deprecated Use verifyPreparedRequest, which also re-derives the operation. */
export function assertPreparedRequestHash(prepared: PreparedSeveraRequest, confirmOperationHash: string): void {
  verifyPreparedRequest(prepared, confirmOperationHash);
}

const GUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isGuid(value: string): boolean {
  return GUID_PATTERN.test(value);
}

/**
 * Guard and encode one caller-supplied path parameter.
 */
export function pathParam(value: string): string {
  const text = String(value);
  if (text === '' || text === '.' || text === '..' || /[/\\?#%]/.test(text)) {
    throw new Error('Invalid path parameter.');
  }
  return encodeURIComponent(text);
}

/**
 * Guard, GUID-check and encode one caller-supplied GUID path parameter.
 */
export function guidParam(value: string | undefined): string {
  if (value === undefined || value === '') {
    throw new Error('Missing GUID path parameter.');
  }
  if (!isGuid(value)) {
    throw new Error('Invalid GUID path parameter.');
  }
  return pathParam(value);
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
  return createHmac('sha256', prepareSecret()).update(stableJson(payload)).digest('hex');
}

const PREPARED_REQUEST_TTL_MS = 15 * 60 * 1000;
const processSecret = randomBytes(32);

function prepareSecret(): Buffer {
  const configured = process.env.SEVERA_PREPARE_SECRET;
  return configured ? Buffer.from(configured, 'utf8') : processSecret;
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
