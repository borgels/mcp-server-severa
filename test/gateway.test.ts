import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { redactSecrets } from '../src/errors.js';
import { admitsKey } from '../src/key-admission.js';
import { callerPseudonym } from '../src/severa/audit.js';
import {
  createSeveraGateway,
  GatewayConfigError,
  SEVERA_READ_SCOPE,
  severaGatewayTools,
  severaToolCatalog,
  type GatewayJsonObject,
} from '../src/gateway.js';
import { registerSeveraTools } from '../src/tools/severa.js';
import { SeveraClient } from '../src/severa/client.js';
import { SEVERA_OPERATIONS } from '../src/severa/openapi-catalog.js';

const ID_A = 'qqqqwwwwzzzzxxxx1';
const SECRET_A = 'jjjjkkkkvvvvyyyy2';
const ID_B = 'qqqqwwwwzzzzxxxx3';
const SECRET_B = 'jjjjkkkkvvvvyyyy4';
const ISSUED_A = 'ttttuuuuffffhhhh5';
const ISSUED_B = 'ttttuuuuffffhhhh6';
const BASE = 'https://severa.example.test/rest-api';
const GUID = '3f1c2a4e-5b6d-4c7e-8f90-1a2b3c4d5e6f';
const A = { clientId: ID_A, clientSecret: SECRET_A };
const B = { clientId: ID_B, clientSecret: SECRET_B };

let dir: string;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'severa-gateway-'));
  vi.unstubAllEnvs();
  // The MCP server's variables, set as a shared process would have them: an embedded instance must ignore them all.
  vi.stubEnv('SEVERA_CLIENT_ID', 'env-client-id-must-not-be-used-0');
  vi.stubEnv('SEVERA_CLIENT_SECRET', 'env-secret-must-not-be-used-000');
  vi.stubEnv('SEVERA_ACCESS_TOKEN', 'env-token-must-not-be-used-0000');
  vi.stubEnv('SEVERA_SCOPE', 'customers:write projects:write');
  vi.stubEnv('SEVERA_BASE_URL', 'https://env-base.example.test');
  // Not a number: an instance that read it would throw.
  vi.stubEnv('SEVERA_TIMEOUT_MS', 'not-a-number');
  vi.stubEnv('SEVERA_ENABLE_WRITES', '');
  vi.stubEnv('SEVERA_AUDIT_LOG', '');
  vi.stubEnv('SEVERA_POLICY_PATH', '');
});

afterEach(() => {
  vi.unstubAllEnvs();
  rmSync(dir, { recursive: true, force: true });
});

function jsonResponse(payload: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  });
}

/** The request's path below the base URL, with the method. */
function requestOf(url: unknown, init: RequestInit | undefined): string {
  const path = decodeURIComponent(new URL(String(url)).pathname).replace(/^\/rest-api/, '');
  return `${init?.method ?? 'GET'} ${path}`;
}

/** A Severa that issues `issued` for a token request and answers every other request with `data`. */
function severa(data: unknown = [{ guid: GUID, name: 'Testfirma ApS' }], issued = ISSUED_A) {
  return vi.fn<typeof fetch>(async (url, init) => {
    if (requestOf(url, init) === 'POST /v1/login/oauth/token') {
      return jsonResponse({ access_token: issued, token_type: 'Bearer', expires_in: 3600, scope: SEVERA_READ_SCOPE });
    }
    return jsonResponse(data);
  });
}

function sink() {
  const records: Array<Record<string, unknown>> = [];
  return { records, audit: (record: Readonly<Record<string, unknown>>) => void records.push({ ...record }) };
}

function matches(template: string, path: string): boolean {
  const pattern = template
    .split('/')
    .map(segment => (/^\{[^}]+\}$/.test(segment) ? '[^/]+' : segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    .join('/');
  return new RegExp(`^${pattern}$`).test(path);
}

/** A valid minimal input per gateway tool. */
const MINIMAL_INPUT: Record<string, GatewayJsonObject> = {
  search_capabilities: {},
  check_connection: {},
  get_schema: {},
  search_customers: {},
  get_customer: { customerGuid: GUID },
  search_projects: {},
  get_project: { projectGuid: GUID },
  rest_read: { path: '/v1/customers' },
};

describe('Severa gateway surface', () => {
  it('uses test credentials the gateway admits', () => {
    for (const value of [ID_A, SECRET_A, ID_B, SECRET_B]) expect(admitsKey(value), value).toBe(true);
  });

  it('keeps the read-only tool set, enabled by default', () => {
    expect(severaGatewayTools.map(tool => [tool.name, tool.riskLevel, tool.enabledByDefault])).toEqual([
      ['search_capabilities', 'read', true],
      ['check_connection', 'read', true],
      ['get_schema', 'read', true],
      ['search_customers', 'read', true],
      ['get_customer', 'read', true],
      ['search_projects', 'read', true],
      ['get_project', 'read', true],
      ['rest_read', 'read', true],
    ]);
    expect(Object.keys(MINIMAL_INPUT)).toEqual(severaGatewayTools.map(tool => tool.name));
  });

  it('has a deeply frozen catalog with the upstream requests and the broad mark', () => {
    expect(Object.isFrozen(severaToolCatalog)).toBe(true);
    for (const entry of severaToolCatalog) {
      expect(Object.isFrozen(entry)).toBe(true);
      expect(Object.isFrozen(entry.inputSchema)).toBe(true);
      expect(Object.isFrozen(entry.upstream)).toBe(true);
      for (const op of entry.upstream) expect(Object.isFrozen(op)).toBe(true);
      expect(entry.broad).toBe(entry.name === 'rest_read');
      expect(entry.inputSchema).toMatchObject({ type: 'object', additionalProperties: false });
    }
    expect(severaToolCatalog.map(entry => entry.name)).toEqual(severaGatewayTools.map(tool => tool.name));
    const token = 'POST /v1/login/oauth/token';
    expect(
      severaToolCatalog
        .filter(entry => entry.name !== 'rest_read')
        .map(entry => [entry.name, entry.upstream.map(op => `${op.method} ${op.path}`)]),
    ).toEqual([
      ['search_capabilities', []],
      ['check_connection', [token, 'GET /heartbeat/authorized']],
      ['get_schema', []],
      ['search_customers', [token, 'GET /v1/customers']],
      ['get_customer', [token, 'GET /v1/customers/{guid}']],
      ['search_projects', [token, 'GET /v1/projects', 'GET /v1/salescases']],
      ['get_project', [token, 'GET /v1/projects/{guid}']],
    ]);
    // The REST read: the token request and every read operation of the catalog, nothing that writes.
    const rest = severaToolCatalog.find(entry => entry.name === 'rest_read')!;
    const reads = SEVERA_OPERATIONS.filter(op => op.risk === 'read').map(op => `${op.method} ${op.path}`);
    expect(rest.upstream.map(op => `${op.method} ${op.path}`)).toEqual([token, ...reads]);
    expect(reads.length).toBeGreaterThan(200);
    expect(() => {
      (severaToolCatalog[0] as { broad: boolean }).broad = true;
    }).toThrow();
    expect(() => {
      (severaToolCatalog[1]!.upstream as unknown as GatewayJsonObject[]).push({ method: 'GET', path: '/v1/users' });
    }).toThrow();
  });

  it('matches the registered handlers: every catalog entry is a registered MCP tool', () => {
    const registered = new Set<string>();
    registerSeveraTools(
      { registerTool: (name: string) => void registered.add(name) } as never,
      new SeveraClient({ accessToken: 'schema-only-token', credentialEnv: {}, timeoutMs: 1 }),
    );
    for (const entry of severaToolCatalog) expect(registered.has(`severa_${entry.name}`), entry.name).toBe(true);
    for (const name of ['prepare_request', 'commit_prepared_request', 'auth_context', 'project_overview']) {
      expect(registered.has(`severa_${name}`)).toBe(true);
      expect(severaToolCatalog.map(entry => entry.name)).not.toContain(name);
    }
    const customer = severaToolCatalog.find(entry => entry.name === 'get_customer')!;
    expect(customer.inputSchema).toMatchObject({ required: ['customerGuid'] });
    const rest = severaToolCatalog.find(entry => entry.name === 'rest_read')!;
    expect(rest.inputSchema).toMatchObject({ required: ['path'] });
  });

  it('asks for a fixed read-only scope', () => {
    const scopes = SEVERA_READ_SCOPE.split(' ');
    expect(scopes.length).toBeGreaterThan(5);
    for (const scope of scopes) expect(scope).toMatch(/^[a-z]+:read$/);
  });
});

describe('Severa gateway credentials', () => {
  it('requires clientId and clientSecret', () => {
    expect(() => createSeveraGateway({} as never)).toThrow(GatewayConfigError);
    expect(() => createSeveraGateway(undefined as never)).toThrow(/requires options\.clientId and options\.clientSecret/);
    expect(() => createSeveraGateway({ clientId: ID_A } as never)).toThrow(GatewayConfigError);
    expect(() => createSeveraGateway({ clientId: '  ', clientSecret: SECRET_A })).toThrow(GatewayConfigError);
  });

  it('admits each credential only as printable ASCII of at least 16 characters, before anything is sent', () => {
    const fetchImpl = vi.fn<typeof fetch>();
    for (const [clientId, clientSecret] of [
      ['short7!', SECRET_A],
      [ID_A, '123456789012345'],
      [ID_A, 'Zq7pX2vK9mWb4TnRé'],
      ['Zq7pX2 vK9mWb4TnR8y', SECRET_A],
      [ID_A, 'Zq7pXsearch_customers2vK'],
    ] as const) {
      expect(() => createSeveraGateway({ clientId, clientSecret, fetchImpl }), `${clientId} ${clientSecret}`).toThrow(
        /credential was refused/,
      );
    }
    expect(() => createSeveraGateway({ ...A, fetchImpl })).not.toThrow();
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('refuses with a fixed text that holds no piece of either credential, as a sealed error', () => {
    const secret = 'Zq7pXsearch_customers2vK';
    let caught: Error | undefined;
    try {
      createSeveraGateway({ clientId: ID_A, clientSecret: secret });
    } catch (error) {
      caught = error as Error;
    }
    expect(caught).toBeInstanceOf(GatewayConfigError);
    expect(caught!.message).toMatch(/^options\.clientSecret: /);
    expect(caught!.stack).toBe(`${caught!.name}: ${caught!.message}`);
    expect((caught as { cause?: unknown }).cause).toBeUndefined();
    for (const value of [secret, ID_A]) {
      for (let i = 0; i + 6 <= value.length; i += 1) expect(caught!.message).not.toContain(value.slice(i, i + 6));
    }
  });

  it('gets its token with its own credentials and the fixed scope at Severa’s address, never from SEVERA_*', async () => {
    const fetchImpl = severa({ authorized: true });
    const gateway = createSeveraGateway({ ...A, fetchImpl });

    const result = await gateway.callTool('check_connection');

    expect(result.isError).toBeUndefined();
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    const [tokenUrl, tokenInit] = fetchImpl.mock.calls[0]!;
    expect(String(tokenUrl)).toBe('https://api.severa.visma.com/rest-api/v1/login/oauth/token');
    expect(JSON.parse(String(tokenInit?.body))).toEqual({
      grant_type: 'client_credentials',
      client_id: ID_A,
      client_secret: SECRET_A,
      scope: SEVERA_READ_SCOPE,
    });
    const [url, init] = fetchImpl.mock.calls[1]!;
    expect(String(url)).toBe('https://api.severa.visma.com/rest-api/heartbeat/authorized');
    expect(init?.headers).toMatchObject({ Authorization: `Bearer ${ISSUED_A}` });
    expect(JSON.stringify(fetchImpl.mock.calls)).not.toMatch(/env-|write/);
  });

  it('drops an access token or scope a host passes anyway', async () => {
    const fetchImpl = severa();
    const gateway = createSeveraGateway({
      ...A,
      baseUrl: BASE,
      fetchImpl,
      accessToken: 'host-static-token-0000',
      scope: 'customers:write',
    } as never);
    await gateway.callTool('search_customers');
    expect(requestOf(fetchImpl.mock.calls[0]![0], fetchImpl.mock.calls[0]![1])).toBe('POST /v1/login/oauth/token');
    expect(String(fetchImpl.mock.calls[0]![1]?.body)).not.toContain('write');
    expect(fetchImpl.mock.calls[1]![1]?.headers).toMatchObject({ Authorization: `Bearer ${ISSUED_A}` });
  });

  it('reuses its token within the instance, and never shares it with another instance', async () => {
    const fetchA = severa([], ISSUED_A);
    const fetchB = severa([], ISSUED_B);
    const gatewayA = createSeveraGateway({ ...A, baseUrl: BASE, fetchImpl: fetchA });
    const gatewayB = createSeveraGateway({ ...B, baseUrl: BASE, fetchImpl: fetchB });
    await gatewayA.callTool('search_customers');
    await gatewayA.callTool('search_projects');
    await gatewayB.callTool('search_customers');
    const tokenRequests = (calls: typeof fetchA.mock.calls) =>
      calls.filter(([url, init]) => requestOf(url, init) === 'POST /v1/login/oauth/token').length;
    expect(tokenRequests(fetchA.mock.calls)).toBe(1);
    expect(tokenRequests(fetchB.mock.calls)).toBe(1);
    expect(fetchB.mock.calls[1]![1]?.headers).toMatchObject({ Authorization: `Bearer ${ISSUED_B}` });
  });

  it('accepts names with or without the prefix', async () => {
    const gateway = createSeveraGateway({ ...A, baseUrl: BASE, fetchImpl: severa() });
    await expect(gateway.callTool('severa_check_connection')).resolves.not.toHaveProperty('isError');
  });
});

describe('Severa gateway upstream requests', () => {
  it('sends only the requests the catalog declares for each tool, the token request included', async () => {
    const seen: string[] = [];
    const inner = severa([]);
    const fetchImpl = vi.fn<typeof fetch>(async (url, init) => {
      seen.push(requestOf(url, init));
      return inner(url, init);
    });

    for (const entry of severaToolCatalog) {
      seen.length = 0;
      // A new instance per tool, so each tool's first request needs a token.
      const gateway = createSeveraGateway({ ...A, baseUrl: BASE, fetchImpl });
      const result = await gateway.callTool(entry.name, MINIMAL_INPUT[entry.name]);
      expect(result.isError, `${entry.name}: ${result.content[0]?.text}`).toBeUndefined();
      expect(seen.length, entry.name).toBe(entry.upstream.length === 0 ? 0 : 2);
      for (const request of seen) {
        const [method, path] = request.split(' ');
        expect(
          entry.upstream.some(op => op.method === method && matches(op.path, path!)),
          `${entry.name}: ${request}`,
        ).toBe(true);
      }
    }
  });

  it('refuses a REST read of anything but a read operation, before anything is sent', async () => {
    const fetchImpl = severa();
    const gateway = createSeveraGateway({ ...A, baseUrl: BASE, fetchImpl });
    for (const input of [
      { method: 'POST', path: '/v1/customers' },
      { path: '/v1/nothing-here' },
      { path: '/v1/customers/../users' },
      { method: 'DELETE', path: `/v1/customers/${GUID}` },
    ]) {
      const result = await gateway.callTool('rest_read', input as GatewayJsonObject);
      expect(result.isError, JSON.stringify(input)).toBe(true);
    }
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('lists only what the instance offers in search_capabilities', async () => {
    const gateway = createSeveraGateway({
      ...A,
      baseUrl: BASE,
      fetchImpl: vi.fn<typeof fetch>(),
      policy: { disabledTools: ['rest_read', 'get_schema'] },
    });
    const result = await gateway.callTool('search_capabilities', { limit: 100 });
    const ids = (result.structuredContent as Array<{ id: string }>).map(entry => entry.id).sort();
    expect(ids).toEqual(
      severaGatewayTools
        .map(tool => `severa_${tool.name}`)
        .filter(name => name !== 'severa_rest_read' && name !== 'severa_get_schema')
        .sort(),
    );

    const all = createSeveraGateway({ ...A, baseUrl: BASE, fetchImpl: vi.fn<typeof fetch>() });
    const found = await all.callTool('search_capabilities', { query: 'customers', limit: 100 });
    const risks = (found.structuredContent as Array<{ id: string; risk: string }>).map(entry => entry.risk);
    expect(risks.length).toBeGreaterThan(0);
    expect(new Set(risks)).toEqual(new Set(['read']));
  });
});

describe('Severa gateway input', () => {
  it('validates input with the tool schema before anything is sent, and refuses unknown fields', async () => {
    const fetchImpl = severa();
    const { records, audit } = sink();
    const gateway = createSeveraGateway({ ...A, baseUrl: BASE, fetchImpl, policy: { audit } });

    for (const [tool, input] of [
      ['get_customer', {}],
      ['get_customer', { customerGuid: 'not-a-guid' }],
      ['search_customers', { clientSecret: 'smuggled' }],
      ['check_connection', { anything: true }],
      ['rest_read', { method: 'DELETE', path: '/v1/customers' }],
    ] as const) {
      const result = await gateway.callTool(tool, input as never);
      expect(result.isError, tool).toBe(true);
      expect(result.content[0]?.text, tool).toMatch(/^Invalid input for /);
    }
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(records.map(record => [record.action, record.reason])).toEqual(
      Array.from({ length: 5 }, () => ['rejected', 'invalid input']),
    );
  });

  it('returns an error for unsupported tools, also for MCP server tools outside the gateway', async () => {
    const fetchImpl = severa();
    const gateway = createSeveraGateway({ ...A, baseUrl: BASE, fetchImpl });

    await expect(gateway.callTool('unknown_tool')).resolves.toMatchObject({
      isError: true,
      content: [{ type: 'text', text: 'Unsupported Severa gateway tool.' }],
    });
    for (const name of ['prepare_request', 'commit_prepared_request', 'auth_context', 'project_overview']) {
      const result = await gateway.callTool(name, { path: '/v1/customers' });
      expect(result.isError, name).toBe(true);
    }
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});

describe('Severa gateway policy', () => {
  it('under a host policy reads no policy or audit variables', async () => {
    const auditFile = join(dir, 'audit.jsonl');
    vi.stubEnv('SEVERA_ENABLE_WRITES', 'true');
    vi.stubEnv('SEVERA_AUDIT_LOG', auditFile);
    vi.stubEnv('SEVERA_POLICY_PATH', join(dir, 'missing-policy.json'));
    const { records, audit } = sink();
    const gateway = createSeveraGateway({ ...A, baseUrl: BASE, fetchImpl: severa(), policy: { audit } });

    const result = await gateway.callTool('search_customers', {}, { caller: 'person-1', requestId: 'call-1' });

    expect(result.isError).toBeUndefined();
    expect(existsSync(auditFile)).toBe(false);
    // The caller only as a pseudonym, and the request id our own, the same for the call's records.
    expect(records.map(record => [record.tool, record.action, record.caller])).toEqual([
      ['severa_search_customers', 'start', callerPseudonym('person-1')],
      ['severa_search_customers', 'finish', callerPseudonym('person-1')],
    ]);
    expect(records[0]?.requestId).toMatch(/^[0-9a-f-]{36}$/);
    expect(records[1]?.requestId).toBe(records[0]?.requestId);
    expect(JSON.stringify(records)).not.toMatch(/person-1|call-1/);
  });

  it('without a host policy uses the default policy and still reads no SEVERA_* variable', async () => {
    const auditFile = join(dir, 'audit.jsonl');
    vi.stubEnv('SEVERA_AUDIT_LOG', auditFile);
    vi.stubEnv('SEVERA_ENABLE_WRITES', 'true');
    const gateway = createSeveraGateway({ ...A, baseUrl: BASE, fetchImpl: severa() });
    const result = await gateway.callTool('search_customers');
    expect(result.isError).toBeUndefined();
    expect(existsSync(auditFile)).toBe(false);
    expect(gateway.tools).toHaveLength(severaGatewayTools.length);
  });

  it('leaves out and refuses the tools the host disables, and refuses an unknown tool in the policy', async () => {
    const fetchImpl = severa();
    const { records, audit } = sink();
    const gateway = createSeveraGateway({
      ...A,
      baseUrl: BASE,
      fetchImpl,
      policy: { disabledTools: ['check_connection', 'severa_rest_read'], audit },
    });

    expect(gateway.tools.map(tool => tool.name)).not.toContain('check_connection');
    expect(gateway.tools.map(tool => tool.name)).not.toContain('rest_read');
    expect(gateway.tools).toHaveLength(severaGatewayTools.length - 2);
    const result = await gateway.callTool('check_connection');
    expect(result.isError).toBe(true);
    expect(result.content[0]?.text).toContain('disabled on this instance by the embedding host');
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(records.map(record => record.action)).toEqual(['policy_denied']);

    expect(() => createSeveraGateway({ ...A, policy: { disabledTools: ['prepare_request'] } })).toThrow(GatewayConfigError);
    expect(() => createSeveraGateway({ ...A, policy: { enableWrites: 'yes' as never } })).toThrow(GatewayConfigError);
    expect(() => createSeveraGateway({ ...A, policy: { audit: 'file' as never } })).toThrow(GatewayConfigError);
  });

  it('does not run a tool whose start record the sink refuses', async () => {
    const fetchImpl = severa();
    const gateway = createSeveraGateway({
      ...A,
      baseUrl: BASE,
      fetchImpl,
      policy: {
        audit: () => {
          throw new Error('sink down');
        },
      },
    });
    const result = await gateway.callTool('search_customers');
    expect(result.isError).toBe(true);
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});

describe('Severa gateway results', () => {
  it('puts the summary, then the data as compact JSON, in the text block, exactly the structured content', async () => {
    const gateway = createSeveraGateway({ ...A, baseUrl: BASE, fetchImpl: severa() });
    const result = await gateway.callTool('search_customers', { rowCount: 5 });
    expect(result.isError).toBeUndefined();
    expect(result.structuredContent).toEqual({ data: [{ guid: GUID, name: 'Testfirma ApS' }], status: 200 });
    expect(result.content).toHaveLength(1);
    const [summary, data, ...rest] = result.content[0]!.text.split('\n\n');
    expect(summary).toBe('Severa customers.');
    expect(rest).toEqual([]);
    expect(data).toBe(JSON.stringify(result.structuredContent));
  });

  it('has a summary line of its own for every tool', async () => {
    const summaries: Record<string, string> = {};
    for (const entry of severaToolCatalog) {
      const gateway = createSeveraGateway({ ...A, baseUrl: BASE, fetchImpl: severa([]) });
      const result = await gateway.callTool(entry.name, MINIMAL_INPUT[entry.name]);
      summaries[entry.name] = result.content[0]!.text.split('\n\n')[0]!;
    }
    expect(summaries).toEqual({
      search_capabilities: 'Severa capabilities.',
      check_connection: 'Severa connection checked.',
      get_schema: 'Severa schema.',
      search_customers: 'Severa customers.',
      get_customer: 'Severa customer.',
      search_projects: 'Severa projects.',
      get_project: 'Severa project.',
      rest_read: 'Severa data.',
    });
  });

  it('redacts the client id and secret and the issued access token from values, keys and numbers', async () => {
    const numericSecret = '8273645190827364';
    for (const [clientId, clientSecret] of [
      [ID_A, SECRET_A],
      [ID_A, numericSecret],
    ] as const) {
      const fetchImpl = severa([
        {
          guid: GUID,
          note: `secret ${clientSecret} id ${clientId} token ${ISSUED_A}`,
          [`k-${ISSUED_A}`]: 'value',
          piece: ISSUED_A.slice(3, 12),
          idPiece: clientId.slice(2, 10),
        },
        { guid: GUID, number: Number(clientSecret) },
      ]);
      const gateway = createSeveraGateway({ clientId, clientSecret, baseUrl: BASE, fetchImpl });
      const result = await gateway.callTool('search_customers');
      expect(result.isError, clientSecret).toBeUndefined();
      const everything = JSON.stringify(result);
      for (const secret of [clientId, clientSecret, ISSUED_A, ISSUED_A.slice(3, 12), clientId.slice(2, 10)]) {
        expect(everything, secret).not.toContain(secret);
      }
      expect(everything).toContain('‹redacted›');
      const [, data] = result.content[0]!.text.split('\n\n');
      expect(JSON.parse(data!)).toEqual(result.structuredContent);
    }
  });

  it('reduces failures nested in a successful answer to the status and our own text', async () => {
    const fetchImpl = severa({
      items: [
        { guid: 'p1', name: 'kept' },
        { guid: 'p2', error: { message: 'Vendor diagnostic text' } },
        { guid: 'p3', status: 502, detail: 'Vendor diagnostic text' },
      ],
      errors: [{ code: 'Vendor diagnostic text', status: 409 }],
    });
    const gateway = createSeveraGateway({ ...A, baseUrl: BASE, fetchImpl });
    const result = await gateway.callTool('search_projects');
    expect((result.structuredContent as { data: unknown }).data).toEqual({
      items: [
        { guid: 'p1', name: 'kept' },
        { error: 'Severa reported a failure.' },
        { status: 502, error: 'Severa reported a failure with HTTP 502.' },
      ],
      errors: [{ status: 409, message: 'Severa reported a failure with HTTP 409.' }],
    });
    expect(JSON.stringify(result)).not.toContain('Vendor diagnostic');
  });
});

describe('Severa gateway errors', () => {
  it('starts with the HTTP status in our own text and never carries the Severa body', async () => {
    for (const [status, hint] of [
      [400, undefined],
      [401, 'rejected the access token'],
      [403, 'no access'],
      [404, 'Severa found nothing'],
      [429, 'throttling'],
      [500, undefined],
    ] as const) {
      const fetchImpl = vi.fn<typeof fetch>(async (url, init) =>
        requestOf(url, init) === 'POST /v1/login/oauth/token'
          ? jsonResponse({ access_token: ISSUED_A, expires_in: 3600 })
          : jsonResponse({ message: `Vendor diagnostic for ${SECRET_A}`, errors: ['Vendor diagnostic'] }, status, {
              'retry-after': '12',
              'x-request-id': 'vendor-request-id',
            }),
      );
      const gateway = createSeveraGateway({ ...A, baseUrl: BASE, fetchImpl });
      const result = await gateway.callTool('search_customers');
      expect(result.isError, String(status)).toBe(true);
      expect(result.structuredContent).toBeUndefined();
      const text = result.content[0]!.text;
      expect(text.startsWith(`Severa API request failed with HTTP ${status}`), text).toBe(true);
      if (hint) expect(text).toContain(hint);
      expect(text).toContain('retry-after=12s');
      for (const bad of ['Vendor diagnostic', 'vendor-request-id', SECRET_A, ID_A, '/v1/customers']) {
        expect(text).not.toContain(bad);
      }
    }
  });

  it('words a failed token request as our own text with the status first', async () => {
    for (const [status, text] of [
      [
        401,
        'Severa API request failed with HTTP 401 | Severa refused the client credentials (invalid, revoked, or without the requested scope). Retrying will not help.',
      ],
      [
        400,
        'Severa API request failed with HTTP 400 | Severa refused the client credentials (invalid, revoked, or without the requested scope). Retrying will not help.',
      ],
      [503, 'Severa API request failed with HTTP 503 | Severa could not issue an access token.'],
    ] as const) {
      const fetchImpl = vi.fn<typeof fetch>(async () =>
        jsonResponse({ error: 'invalid_client', error_description: `unknown client ${ID_A} / ${SECRET_A}` }, status),
      );
      const gateway = createSeveraGateway({ ...A, baseUrl: BASE, fetchImpl });
      const result = await gateway.callTool('search_customers');
      expect(result).toEqual({ isError: true, content: [{ type: 'text', text }] });
      expect(fetchImpl).toHaveBeenCalledOnce();
    }
  });

  it('refuses a token answer without a token, in our own words', async () => {
    const gateway = createSeveraGateway({
      ...A,
      baseUrl: BASE,
      fetchImpl: vi.fn<typeof fetch>(async () => jsonResponse({ error: `no token for ${SECRET_A}` })),
    });
    const result = await gateway.callTool('search_customers');
    expect(result.content[0]!.text).toBe('The Severa token answer held no access token.');
  });

  it('asks for a new token after Severa rejects the cached one', async () => {
    let calls = 0;
    const fetchImpl = vi.fn<typeof fetch>(async (url, init) => {
      if (requestOf(url, init) === 'POST /v1/login/oauth/token') {
        calls += 1;
        return jsonResponse({ access_token: calls === 1 ? ISSUED_A : ISSUED_B, expires_in: 3600 });
      }
      return calls === 1 ? jsonResponse({}, 401) : jsonResponse([]);
    });
    const gateway = createSeveraGateway({ ...A, baseUrl: BASE, fetchImpl });
    expect((await gateway.callTool('search_customers')).isError).toBe(true);
    expect((await gateway.callTool('search_customers')).isError).toBeUndefined();
    expect(calls).toBe(2);
  });

  it('refuses redirects, network failures and timeouts in our own words, without the address or the cause', async () => {
    const redirect = createSeveraGateway({
      ...A,
      baseUrl: BASE,
      fetchImpl: vi.fn<typeof fetch>(
        async () => new Response(null, { status: 302, headers: { location: 'https://elsewhere.example/x' } }),
      ),
    });
    const redirected = await redirect.callTool('search_customers');
    expect(redirected.content[0]!.text).toMatch(/^Severa API responded with a redirect \(HTTP 302\) for POST;/);
    expect(redirected.content[0]!.text).not.toContain('elsewhere');

    const network = createSeveraGateway({
      ...A,
      baseUrl: BASE,
      fetchImpl: vi.fn<typeof fetch>(async () => {
        throw new TypeError('fetch failed', {
          cause: Object.assign(new Error(`connect to ${BASE} failed`), { code: 'ECONNREFUSED' }),
        });
      }),
    });
    const failed = await network.callTool('search_customers');
    expect(failed.content[0]!.text).toBe('Network error calling the Severa API (POST) (ECONNREFUSED).');

    const slow = createSeveraGateway({
      ...A,
      baseUrl: BASE,
      timeoutMs: 1234,
      fetchImpl: vi.fn<typeof fetch>(async () => {
        throw new DOMException('The operation was aborted due to timeout', 'TimeoutError');
      }),
    });
    expect((await slow.callTool('search_customers')).content[0]!.text).toBe(
      'Severa API request timed out after 1234 ms (POST).',
    );
  });

  it('does not quote a refused base URL', () => {
    let caught: Error | undefined;
    try {
      createSeveraGateway({ ...A, baseUrl: 'http://severa.example.test/secret-path' });
    } catch (error) {
      caught = error as Error;
    }
    expect(caught).toBeInstanceOf(GatewayConfigError);
    expect(caught!.message).not.toContain('secret-path');
  });
});

describe('Severa gateway redaction and call scopes', () => {
  it('redacts the credentials from every audit record field', async () => {
    const fetchImpl = vi.fn<typeof fetch>(async () => new Response(`client ${SECRET_A} rejected`, { status: 401 }));
    const { records, audit } = sink();
    const gateway = createSeveraGateway({ ...A, baseUrl: BASE, fetchImpl, policy: { audit } });

    const result = await gateway.callTool('check_connection', {}, { caller: `person ${SECRET_A}`, requestId: SECRET_A });

    expect(result.isError).toBe(true);
    expect(JSON.stringify(result)).not.toContain(SECRET_A);
    expect(records.length).toBeGreaterThan(0);
    expect(JSON.stringify(records)).not.toContain(SECRET_A);
    expect(records[0]?.caller).toMatch(/^hmac:[0-9a-f]{16}$/);
    expect(records.find(record => record.action === 'error')?.error).toBe('http_401');
  });

  it('redacts an unknown tool name before cutting it short, so no part of a credential is left', async () => {
    const { records, audit } = sink();
    const gateway = createSeveraGateway({ ...A, baseUrl: BASE, fetchImpl: severa(), policy: { audit } });

    const result = await gateway.callTool(`${'x'.repeat(90)}${SECRET_A}`);

    const everything = JSON.stringify([result, records]);
    for (const piece of [SECRET_A, SECRET_A.slice(0, 10), SECRET_A.slice(0, 8)]) expect(everything).not.toContain(piece);
    expect(records.map(record => [record.action, record.reason])).toEqual([['rejected', 'unsupported tool']]);
  });

  it('keeps no process-wide registry: an instance’s secrets are not redacted outside its calls', async () => {
    const gateway = createSeveraGateway({ ...A, baseUrl: BASE, fetchImpl: severa() });
    await gateway.callTool('check_connection');
    expect(redactSecrets(`plain ${SECRET_A} ${ISSUED_A}`)).toBe(`plain ${SECRET_A} ${ISSUED_A}`);
  });

  it('keeps two tenants apart when they call at the same time, each with its own token', async () => {
    let release!: () => void;
    const gate = new Promise<void>(resolve => (release = resolve));
    const seen: string[] = [];
    const fetchImpl = vi.fn<typeof fetch>(async (url, init) => {
      if (requestOf(url, init) === 'POST /v1/login/oauth/token') {
        const body = JSON.parse(String(init?.body)) as { client_id: string };
        return jsonResponse({ access_token: body.client_id === ID_A ? ISSUED_A : ISSUED_B, expires_in: 3600 });
      }
      const authorization = String((init?.headers as Record<string, string>).Authorization);
      seen.push(authorization);
      await gate;
      // Severa echoing the token it received, in the data.
      return jsonResponse([{ received: authorization, token: authorization.slice(7) }]);
    });
    const a = sink();
    const b = sink();
    const gatewayA = createSeveraGateway({ ...A, baseUrl: BASE, fetchImpl, policy: { audit: a.audit } });
    const gatewayB = createSeveraGateway({ ...B, baseUrl: BASE, fetchImpl, policy: { audit: b.audit } });

    const both = Promise.all([
      gatewayA.callTool('search_customers', {}, { caller: 'a' }),
      gatewayB.callTool('search_customers', {}, { caller: 'b' }),
    ]);
    for (let i = 0; i < 50 && seen.length < 2; i += 1) await new Promise(resolve => setImmediate(resolve));
    expect(seen.sort()).toEqual([`Bearer ${ISSUED_A}`, `Bearer ${ISSUED_B}`].sort());
    release();
    const [ra, rb] = await both;

    for (const [result, own] of [
      [ra, [ID_A, SECRET_A, ISSUED_A]],
      [rb, [ID_B, SECRET_B, ISSUED_B]],
    ] as const) {
      expect(result.isError).toBeUndefined();
      for (const secret of own) expect(JSON.stringify(result)).not.toContain(secret);
    }
    expect(a.records.every(record => record.caller === callerPseudonym('a'))).toBe(true);
    expect(b.records.every(record => record.caller === callerPseudonym('b'))).toBe(true);
    expect(JSON.stringify(a.records)).not.toMatch(new RegExp(`${SECRET_A}|${ISSUED_A}`));
    expect(JSON.stringify(b.records)).not.toMatch(new RegExp(`${SECRET_B}|${ISSUED_B}`));
  });

  it('runs a call made from inside another instance’s sink under its own scope, not the outer policy', async () => {
    const outer = sink();
    const innerFetch = severa();
    const inner = createSeveraGateway({ ...B, baseUrl: BASE, fetchImpl: innerFetch });
    let innerResult: unknown;
    const gateway = createSeveraGateway({
      ...A,
      baseUrl: BASE,
      fetchImpl: severa(),
      policy: {
        disabledTools: ['search_customers'],
        audit: async record => {
          outer.audit(record);
          if (record.action === 'start' && innerResult === undefined) {
            innerResult = 'pending';
            innerResult = await inner.callTool('search_customers', {}, { caller: 'inner' });
          }
        },
      },
    });

    await gateway.callTool('check_connection', {}, { caller: 'outer' });

    // The inner instance has no host policy: search_customers, disabled on the outer one, runs there.
    expect(innerResult).toMatchObject({ structuredContent: { data: [{ guid: GUID }] } });
    expect(innerFetch).toHaveBeenCalledTimes(2);
    expect(outer.records.map(record => record.caller)).toEqual([callerPseudonym('outer'), callerPseudonym('outer')]);
  });
});
