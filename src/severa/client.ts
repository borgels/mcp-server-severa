import { SeveraHttpError } from '../errors.js';
import { SEVERA_DEFAULT_BASE_URL } from './openapi-catalog.js';

export type SeveraHttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type SeveraQueryValue = string | number | boolean | null | undefined | Array<string | number | boolean>;

export interface SeveraClientOptions {
  clientId?: string;
  clientSecret?: string;
  scope?: string;
  accessToken?: string;
  baseUrl?: string;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
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

interface OAuthToken {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  refresh_token?: string;
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
  private cachedToken?: { accessToken: string; expiresAt: number; scope?: string };

  constructor(options: SeveraClientOptions = {}) {
    this.clientId = options.clientId ?? process.env.SEVERA_CLIENT_ID;
    this.clientSecret = options.clientSecret ?? process.env.SEVERA_CLIENT_SECRET;
    this.scope = options.scope ?? process.env.SEVERA_SCOPE;
    this.staticAccessToken = options.accessToken ?? process.env.SEVERA_ACCESS_TOKEN;
    this.baseUrl = trimTrailingSlash(options.baseUrl ?? process.env.SEVERA_BASE_URL ?? SEVERA_DEFAULT_BASE_URL);
    assertSafeBaseUrl(this.baseUrl);
    this.fetchImpl = options.fetchImpl ?? fetch;
    this.timeoutMs = options.timeoutMs ?? Number(process.env.SEVERA_TIMEOUT_MS ?? 30_000);
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
    const headers: Record<string, string> = {
      Accept: 'application/json',
      Authorization: `Bearer ${await this.accessToken()}`,
    };

    if (request.body !== undefined) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await this.fetchImpl(url, {
      method: request.method,
      headers,
      body: request.body === undefined ? undefined : JSON.stringify(request.body),
      signal: AbortSignal.timeout(this.timeoutMs),
    });

    const responseBody = await readResponseBody(response);

    if (!response.ok) {
      throw new SeveraHttpError({
        status: response.status,
        method: request.method,
        url,
        payload: responseBody,
        retryAfter: response.headers.get('retry-after') ?? undefined,
        requestId:
          response.headers.get('x-request-id') ??
          response.headers.get('request-id') ??
          response.headers.get('traceparent') ??
          undefined,
        fallbackMessage: typeof responseBody === 'string' ? responseBody : undefined,
      });
    }

    return {
      data: responseBody as T,
      nextPageToken: response.headers.get('NextPageToken') ?? response.headers.get('nextpagetoken') ?? undefined,
      status: response.status,
    };
  }

  async getTokenMetadata(): Promise<{ authMethod: string; scope?: string; expiresAt?: string }> {
    if (this.staticAccessToken) {
      return { authMethod: 'access_token' };
    }

    const token = await this.fetchClientCredentialsToken();
    return {
      authMethod: 'client_credentials',
      scope: token.scope,
      expiresAt: new Date(token.expiresAt).toISOString(),
    };
  }

  private async accessToken(): Promise<string> {
    if (this.staticAccessToken) {
      return this.staticAccessToken;
    }

    return (await this.fetchClientCredentialsToken()).accessToken;
  }

  private async fetchClientCredentialsToken(): Promise<{ accessToken: string; expiresAt: number; scope?: string }> {
    const now = Date.now();
    if (this.cachedToken && this.cachedToken.expiresAt - now > 60_000) {
      return this.cachedToken;
    }

    if (!this.clientId || !this.clientSecret) {
      throw new Error('Missing Severa credentials. Set SEVERA_CLIENT_ID and SEVERA_CLIENT_SECRET, or set SEVERA_ACCESS_TOKEN.');
    }

    const url = `${this.baseUrl}/v1/login/oauth/token`;
    const response = await this.fetchImpl(url, {
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
      signal: AbortSignal.timeout(this.timeoutMs),
    });

    const responseBody = await readResponseBody(response);
    if (!response.ok) {
      throw new SeveraHttpError({
        status: response.status,
        method: 'POST',
        url,
        payload: responseBody,
        fallbackMessage: typeof responseBody === 'string' ? responseBody : undefined,
      });
    }

    const token = responseBody as OAuthToken;
    if (!token.access_token) {
      throw new Error('Severa token response did not include access_token.');
    }

    this.cachedToken = {
      accessToken: token.access_token,
      expiresAt: now + Math.max(1, Number(token.expires_in ?? 3600)) * 1000,
      scope: token.scope,
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

async function readResponseBody(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  if (!text) {
    return null;
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return text;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
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
  return value.replace(/\/+$/, '');
}

function assertSafeBaseUrl(baseUrl: string): void {
  let parsed: URL;
  try {
    parsed = new URL(baseUrl);
  } catch {
    throw new Error(`SEVERA_BASE_URL is not a valid URL: ${baseUrl}`);
  }

  if (parsed.protocol === 'https:') {
    return;
  }

  if (parsed.protocol === 'http:' && isLocalHost(parsed.hostname)) {
    return;
  }

  throw new Error(
    `Refusing to send Severa credentials over ${parsed.protocol}//. Use https:// (loopback http:// is allowed for local mocks).`,
  );
}

function isLocalHost(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
}
