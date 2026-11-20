import { readEnvInteger } from '../config-env.js';
import { limitDepth, nestedFailuresAsStatus, SeveraHttpError } from '../errors.js';
import { describeUrl, discardBody, isRedirect, registerSecret, SecretRedactor } from '../upstream-http.js';
import { SEVERA_DEFAULT_BASE_URL } from './openapi-catalog.js';

export type SeveraHttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type SeveraQueryValue = string | number | boolean | null | undefined | Array<string | number | boolean>;

/** The client-credentials token request, relative to the base URL. It is an upstream request like any other. */
export const TOKEN_PATH = '/v1/login/oauth/token';

/** Issued tokens shorter than this are refused: every piece of a token must be long enough to be redacted. */
export const MIN_ISSUED_TOKEN_LENGTH = 16;

export interface SeveraClientOptions {
  clientId?: string;
  clientSecret?: string;
  scope?: string;
  accessToken?: string;
  baseUrl?: string;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
  /**
   * Where a missing clientId, clientSecret, scope, accessToken, baseUrl or
   * timeout is read from. Default process.env (the MCP server). The gateway
   * passes {}: an embedded instance never reads the environment.
   */
  credentialEnv?: Readonly<Record<string, string | undefined>>;
  /**
   * The instance's own redactor (the gateway). Without one the credentials,
   * and every access token Severa issues, are redacted by the MCP server's
   * process-wide redactor.
   */
  redactor?: SecretRedactor;
  /**
   * A further check of every token Severa issues (the gateway: no piece shared with its fixed fallbacks). A token it
   * refuses is never used.
   */
  acceptsIssuedToken?: (token: string) => boolean;
}

export interface SeveraRequest {
  method: SeveraHttpMethod;
  path: string;
  query?: Record<string, SeveraQueryValue>;
  body?: unknown;
}

export interface SeveraResponse<T = unknown> {
  data: T;
  nextPageToken?: string;
  status: number;
}

interface CachedToken {
  accessToken: string;
  expiresAt: number;
  scope?: string;
}

export class SeveraClient {
  private readonly clientId?: string;
  private readonly clientSecret?: string;
  private readonly scope?: string;
  private readonly staticAccessToken?: string;
  private readonly baseUrl: string;
  private readonly fetchImpl: typeof fetch;
  private readonly timeoutMs: number;
  private readonly ownRedactor: boolean;
  private readonly acceptsIssuedToken?: (token: string) => boolean;
  /** This client's token: never shared with another client, so never with another gateway instance. */
  private cachedToken?: CachedToken;
  private pendingToken?: Promise<CachedToken>;

  /** Redacts this client's credentials and the access tokens Severa issued to it. */
  readonly redactor: SecretRedactor;

  constructor(options: SeveraClientOptions = {}) {
    const env = options.credentialEnv ?? process.env;
    this.clientId = options.clientId ?? env.SEVERA_CLIENT_ID;
    this.clientSecret = options.clientSecret ?? env.SEVERA_CLIENT_SECRET;
    this.scope = options.scope ?? env.SEVERA_SCOPE;
    this.staticAccessToken = options.accessToken ?? env.SEVERA_ACCESS_TOKEN;
    this.redactor = options.redactor ?? new SecretRedactor();
    this.ownRedactor = !options.redactor;
    this.acceptsIssuedToken = options.acceptsIssuedToken;
    for (const secret of [this.clientId, this.clientSecret, this.staticAccessToken]) {
      this.addSecret(secret);
    }
    this.baseUrl = trimTrailingSlash(options.baseUrl ?? env.SEVERA_BASE_URL ?? SEVERA_DEFAULT_BASE_URL);
    assertSafeBaseUrl(this.baseUrl);
    this.fetchImpl = options.fetchImpl ?? fetch;
    this.timeoutMs =
      options.timeoutMs ?? readEnvInteger('SEVERA_TIMEOUT_MS', 30_000, { min: 1, max: 600_000 }, env);
  }

  async get<T = unknown>(path: string, query?: Record<string, SeveraQueryValue>): Promise<SeveraResponse<T>> {
    return this.request<T>({ method: 'GET', path, query });
  }

  async post<T = unknown>(
    path: string,
    query?: Record<string, SeveraQueryValue>,
    body?: unknown,
  ): Promise<SeveraResponse<T>> {
    return this.request<T>({ method: 'POST', path, query, body });
  }

  async request<T = unknown>(request: SeveraRequest): Promise<SeveraResponse<T>> {
    const url = this.url(request.path, request.query);
    const accessToken = await this.accessToken();
    const headers: Record<string, string> = {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    if (request.body !== undefined) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await this.send(url, {
      method: request.method,
      headers,
      body: request.body === undefined ? undefined : JSON.stringify(request.body),
    });

    if (!response.ok) {
      // The body is Severa's text: it is never read into an error, a result or an audit record.
      await discardBody(response);
      if (response.status === 401 && this.cachedToken?.accessToken === accessToken) {
        // A rejected token is not used again: the next call asks for a new one.
        this.cachedToken = undefined;
      }
      throw new SeveraHttpError({
        status: response.status,
        method: request.method,
        url: describeUrl(url),
        retryAfter: response.headers.get('retry-after') ?? undefined,
        requestId: response.headers.get('x-request-id') ?? response.headers.get('request-id') ?? undefined,
      });
    }

    // A failure reported inside a successful answer keeps only its status and our own text.
    const data = nestedFailuresAsStatus(await readResponseBody(response, request.method)) as T;
    return {
      data,
      nextPageToken: response.headers.get('NextPageToken') ?? undefined,
      status: response.status,
    };
  }

  async getTokenMetadata(): Promise<{ authMethod: string; scope?: string; expiresAt?: string }> {
    if (this.staticAccessToken) {
      return { authMethod: 'access_token' };
    }

    const token = await this.clientCredentialsToken();
    return {
      authMethod: 'client_credentials',
      scope: token.scope,
      expiresAt: new Date(token.expiresAt).toISOString(),
    };
  }

  private addSecret(secret: string | undefined): void {
    this.redactor.addSecret(secret);
    if (this.ownRedactor) {
      // The MCP server: its errors are redacted outside any call scope.
      registerSecret(secret);
    }
  }

  /** One fetch to Severa: redirects are never followed, and a network failure or timeout is worded by us. */
  private async send(url: string, init: RequestInit): Promise<Response> {
    const method = String(init.method ?? 'GET');
    let response: Response;
    try {
      response = await this.fetchImpl(url, {
        ...init,
        // Never follow redirects: credentials must only reach the configured API origin.
        redirect: 'manual',
        signal: AbortSignal.timeout(this.timeoutMs),
      });
    } catch (error) {
      throw transportError(error, method, this.timeoutMs);
    }
    if (isRedirect(response.status)) {
      // The Location is Severa's text and is never quoted, and the address is configuration.
      await discardBody(response);
      throw new Error(
        `Severa API responded with a redirect (HTTP ${response.status}) for ${method}; ` +
          'redirects are not followed, so credentials are never sent to another host. Check the configured base URL.',
      );
    }
    return response;
  }

  private async accessToken(): Promise<string> {
    if (this.staticAccessToken) {
      return this.staticAccessToken;
    }

    return (await this.clientCredentialsToken()).accessToken;
  }

  /** The cached token while it has more than a minute left; otherwise one new request, shared by concurrent calls. */
  private async clientCredentialsToken(): Promise<CachedToken> {
    if (this.cachedToken && this.cachedToken.expiresAt - Date.now() > 60_000) {
      return this.cachedToken;
    }
    this.pendingToken ??= this.fetchClientCredentialsToken().finally(() => {
      this.pendingToken = undefined;
    });
    return this.pendingToken;
  }

  private async fetchClientCredentialsToken(): Promise<CachedToken> {
    if (!this.clientId || !this.clientSecret) {
      throw new Error('Missing Severa credentials. Set SEVERA_CLIENT_ID and SEVERA_CLIENT_SECRET, or set SEVERA_ACCESS_TOKEN.');
    }

    const now = Date.now();
    const url = `${this.baseUrl}${TOKEN_PATH}`;
    const response = await this.send(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        scope: this.scope,
      }),
    });

    if (!response.ok) {
      // The body is Severa's text, and may echo the credentials: never read.
      await discardBody(response);
      throw new SeveraHttpError({
        status: response.status,
        method: 'POST',
        url: describeUrl(url),
        retryAfter: response.headers.get('retry-after') ?? undefined,
        tokenRequest: true,
      });
    }

    const body = await readResponseBody(response, 'POST');
    const token = body !== null && typeof body === 'object' && !Array.isArray(body) ? (body as Record<string, unknown>) : {};
    const accessToken = token.access_token;
    if (typeof accessToken !== 'string' || accessToken === '') {
      throw new Error('The Severa token answer held no access token.');
    }
    const refreshToken = token.refresh_token;
    for (const issued of [accessToken, ...(refreshToken === undefined || refreshToken === null ? [] : [refreshToken])]) {
      // Only a token this client can keep out of every output is used: printable ASCII (it goes in a header), at
      // least MIN_ISSUED_TOKEN_LENGTH characters (so every piece of it is redacted), and accepted by the gateway's
      // check (no piece shared with its fixed fallbacks). A refused token is dropped: never used, kept or quoted.
      if (
        typeof issued !== 'string' ||
        issued.length < MIN_ISSUED_TOKEN_LENGTH ||
        !/^[!-~]+$/.test(issued) ||
        (this.acceptsIssuedToken !== undefined && !this.acceptsIssuedToken(issued))
      ) {
        throw new Error('The Severa token answer held a token this server cannot use.');
      }
    }
    // The issued tokens are secrets of this client from now on: redacted wherever they would appear.
    this.addSecret(accessToken);
    if (typeof refreshToken === 'string') this.addSecret(refreshToken);

    const expiresIn = Number(token.expires_in ?? 3600);
    this.cachedToken = {
      accessToken,
      expiresAt: now + (Number.isFinite(expiresIn) && expiresIn > 0 ? expiresIn : 3600) * 1000,
      scope: typeof token.scope === 'string' ? token.scope : undefined,
    };
    return this.cachedToken;
  }

  private url(path: string, query: Record<string, SeveraQueryValue> = {}): string {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const url = new URL(`${this.baseUrl}${normalizedPath}`);

    for (const [key, value] of Object.entries(query)) {
      appendQueryValue(url.searchParams, key, value);
    }

    return url.toString();
  }
}

export function paginationQuery(input: {
  pageToken?: string;
  rowCount?: number;
  changedSince?: string;
}): Record<string, SeveraQueryValue> {
  return {
    pageToken: input.pageToken,
    rowCount: input.rowCount,
    changedSince: input.changedSince,
  };
}

/** System error codes a network error may name: a fixed list, so no other text from a cause is ever shown. */
const SHOWN_NETWORK_CODES: ReadonlySet<string> = new Set([
  'ECONNRESET',
  'ECONNREFUSED',
  'ECONNABORTED',
  'ETIMEDOUT',
  'EPIPE',
  'EAI_AGAIN',
  'ENOTFOUND',
  'EHOSTUNREACH',
  'ENETUNREACH',
  'UND_ERR_CONNECT_TIMEOUT',
  'UND_ERR_HEADERS_TIMEOUT',
  'UND_ERR_BODY_TIMEOUT',
  'UND_ERR_SOCKET',
  'CERT_HAS_EXPIRED',
  'DEPTH_ZERO_SELF_SIGNED_CERT',
  'SELF_SIGNED_CERT_IN_CHAIN',
  'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
  'ERR_TLS_CERT_ALTNAME_INVALID',
]);

/** A network failure in our own words: only a system error code from a fixed list, never a message. */
function transportError(error: unknown, method: string, timeoutMs: number): Error {
  // The address is configuration and is not quoted.
  if (error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError')) {
    return timeoutError(`Severa API request timed out after ${timeoutMs} ms (${method}).`);
  }
  const code = error instanceof Error ? (error.cause as { code?: unknown } | undefined)?.code : undefined;
  const shown = typeof code === 'string' && SHOWN_NETWORK_CODES.has(code) ? ` (${code})` : '';
  return new Error(`Network error calling the Severa API (${method})${shown}.`);
}

/** Our own text for a timeout, named TimeoutError so the audit records it as `timeout`. */
function timeoutError(message: string): Error {
  const error = new Error(message);
  error.name = 'TimeoutError';
  return error;
}

/** Whether a content type is JSON: application/json or a +json type, with or without parameters. */
function isJsonContentType(contentType: string): boolean {
  const type = contentType.split(';')[0]?.trim().toLowerCase() ?? '';
  return type === 'application/json' || (type.startsWith('application/') && type.endsWith('+json'));
}

/**
 * Reads a successful response body: JSON (depth-limited). Anything else (another content type, or JSON that does not
 * parse) is refused with a fixed text: it would reach the caller without the field masking that applies to data.
 */
async function readResponseBody(response: Response, method: string): Promise<unknown> {
  let text: string;
  try {
    text = await response.text();
  } catch (error) {
    // Anything thrown while reading the body is replaced by our own text: its message is not ours.
    if (error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError')) {
      throw timeoutError(`Severa API response timed out while it was being read (${method}).`);
    }
    throw new Error(`The Severa API response could not be read (${method}).`);
  }

  if (!text) {
    return null;
  }

  if (!isJsonContentType(response.headers.get('content-type') ?? '')) {
    throw new Error(`Severa API answered with a content type this server does not read (${method}).`);
  }

  try {
    // Depth-limited at once, so nothing downstream (a handler's JSON text, the gateway) can exhaust the stack.
    return limitDepth(JSON.parse(text) as unknown);
  } catch {
    throw new Error(`Severa API answered with JSON that could not be read (${method}).`);
  }
}

function appendQueryValue(searchParams: URLSearchParams, key: string, value: SeveraQueryValue): void {
  if (value === undefined || value === null || value === '') {
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      appendQueryValue(searchParams, key, item);
    }
    return;
  }

  searchParams.append(key, String(value));
}

function trimTrailingSlash(value: string): string {
  let end = value.length;
  while (end > 0 && value.charCodeAt(end - 1) === 47) {
    end -= 1;
  }
  return value.slice(0, end);
}

function assertSafeBaseUrl(baseUrl: string): void {
  let parsed: URL;
  try {
    parsed = new URL(baseUrl);
  } catch {
    // The value is not quoted: configuration is never echoed.
    throw new Error('The Severa base URL is not a valid URL.');
  }

  if (parsed.protocol === 'https:') {
    return;
  }

  if (parsed.protocol === 'http:' && isLocalHost(parsed.hostname)) {
    return;
  }

  throw new Error(
    'Refusing to send Severa credentials over a connection that is not https. Use https:// (loopback http:// is allowed for local mocks).',
  );
}

function isLocalHost(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
}
