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
        return Response.json({ access_token: 'token-1', expires_in: 3600, scope: 'customers:read' });
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
      Authorization: 'Bearer token-1',
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

  it('formats and redacts API errors', async () => {
    const error = new SeveraHttpError({
      status: 401,
      method: 'GET',
      url: 'https://example.test/v1/customers',
      payload: { error: 'invalid_token', error_description: 'Bearer super-secret failed' },
    });

    expect(error.message).toContain('Severa API request failed with HTTP 401');
    expect(formatUnknownError(error)).not.toContain('super-secret');
    expect(redactSecrets('SEVERA_CLIENT_SECRET=abc Authorization: Bearer xyz')).toContain('[REDACTED]');
  });
});
