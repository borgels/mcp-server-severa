import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { createServer } from '../src/server.js';

type JsonObject = Record<string, unknown>;

interface ProbeResult {
  ok: boolean;
  summary?: unknown;
  error?: string;
}

async function main(): Promise<void> {
  if ((!process.env.SEVERA_CLIENT_ID || !process.env.SEVERA_CLIENT_SECRET) && !process.env.SEVERA_ACCESS_TOKEN) {
    console.error('Skipping broad live smoke test: set SEVERA_CLIENT_ID/SEVERA_CLIENT_SECRET or SEVERA_ACCESS_TOKEN.');
    return;
  }

  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const server = createServer();
  const client = new Client({ name: 'severa-broad-live-smoke', version: '0.1.0' });

  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);

  try {
    const tools = await client.listTools();
    const context = await discoverContext(client);
    const calls = broadToolCalls(context);
    const results: Record<string, ProbeResult> = {};
    let preparedRequest: JsonObject | undefined;

    for (const [name, args] of calls) {
      const result = await callTool(client, name, args);
      results[name] = result;
      if (name === 'severa_prepare_request' && result.ok) {
        preparedRequest = await callToolJson(client, name, args);
      }
    }

    if (preparedRequest) {
      const previousWrites = process.env.SEVERA_ENABLE_WRITES;
      process.env.SEVERA_ENABLE_WRITES = 'false';
      results.severa_commit_prepared_request_disabled = await callTool(client, 'severa_commit_prepared_request', {
        preparedRequest,
        confirmOperationHash: preparedRequest.operationHash,
        idempotencyKey: 'broad-smoke-no-write',
      });
      if (previousWrites === undefined) {
        delete process.env.SEVERA_ENABLE_WRITES;
      } else {
        process.env.SEVERA_ENABLE_WRITES = previousWrites;
      }
    }

    results.rest_read_rejects_write = await callTool(client, 'severa_rest_read', {
      method: 'POST',
      path: '/v1/customers',
      query: {},
      body: { name: 'Not written by smoke test' },
    });
    results.prepare_rejects_read_style_post = await callTool(client, 'severa_prepare_request', {
      method: 'POST',
      path: '/v1/resourceallocations/allocations',
      body: {},
      reason: 'should reject read-style post prepare',
    });

    const expectedFailures = new Set([
      'severa_commit_prepared_request_disabled',
      'rest_read_rejects_write',
      'prepare_rejects_read_style_post',
    ]);
    const failures = Object.entries(results).filter(([name, result]) =>
      expectedFailures.has(name) ? result.ok : !result.ok,
    );

    const report = {
      ok: failures.length === 0,
      listedToolCount: tools.tools.length,
      listedTools: tools.tools.map(tool => tool.name),
      customerGuidFound: Boolean(context.customerGuid),
      projectGuidFound: Boolean(context.projectGuid),
      results,
      failures,
    };

    console.log(JSON.stringify(report, null, 2));

    if (failures.length > 0) {
      process.exitCode = 1;
    }
  } finally {
    await client.close();
    await server.close();
  }
}

async function discoverContext(client: Client): Promise<{ customerGuid?: string; projectGuid?: string }> {
  const customers = await callToolJson(client, 'severa_search_customers', { rowCount: 1 });
  const projects = await callToolJson(client, 'severa_search_projects', { rowCount: 1 });
  return {
    customerGuid: firstGuid(customers),
    projectGuid: firstGuid(projects),
  };
}

function broadToolCalls(context: { customerGuid?: string; projectGuid?: string }): Array<[string, JsonObject]> {
  return [
    ['severa_search_capabilities', { query: 'invoice customer project time resource allocation settings files', limit: 10 }],
    ['severa_get_capability', { id: 'severa_search_projects' }],
    ['severa_get_schema', { name: 'CustomerModel' }],
    ['severa_check_connection', {}],
    ['severa_auth_context', {}],
    ['severa_search_customers', { rowCount: 1 }],
    ...(context.customerGuid ? [['severa_get_customer', { customerGuid: context.customerGuid }] as [string, JsonObject]] : []),
    ['severa_search_contacts', { rowCount: 1 }],
    ['severa_search_projects', { rowCount: 1 }],
    ...(context.projectGuid ? [['severa_get_project', { projectGuid: context.projectGuid }] as [string, JsonObject]] : []),
    ...(context.projectGuid
      ? [[
        'severa_project_overview',
        {
          projectGuid: context.projectGuid,
          includePhases: true,
          includeMembers: true,
          includeWorkHours: true,
          includeFees: true,
          includeInvoices: true,
          includeTravelExpenses: true,
          includeFiles: true,
          rowCount: 2,
        },
      ] as [string, JsonObject]]
      : []),
    ['severa_search_invoices', { rowCount: 1 }],
    ['severa_search_workhours', { rowCount: 1 }],
    ['severa_search_time_entries', { rowCount: 1 }],
    ['severa_search_fees', { rowCount: 1 }],
    ['severa_search_travel_expenses', { rowCount: 1 }],
    ['severa_search_resource_allocations', { useCriteriaPost: true, rowCount: 1, criteria: {} }],
    ['severa_search_users', { rowCount: 1 }],
    ['severa_search_activities', { rowCount: 1 }],
    ...(context.projectGuid ? [['severa_search_files', { projectGuid: context.projectGuid, rowCount: 1 }] as [string, JsonObject]] : []),
    ['severa_search_settings', { path: '/v1/products', query: { rowCount: 1 } }],
    ['severa_get_organization', { resource: 'details' }],
    ['severa_rest_read', { method: 'GET', path: '/v1/businessunits', query: { rowCount: 1 } }],
    [
      'severa_prepare_request',
      {
        method: 'PATCH',
        path: '/v1/customers/00000000-0000-0000-0000-000000000000',
        body: { name: 'Dry run only' },
        reason: 'broad live smoke dry-run only',
      },
    ],
  ];
}

async function callTool(client: Client, name: string, args: JsonObject): Promise<ProbeResult> {
  try {
    const parsed = await callToolJson(client, name, args);
    return { ok: true, summary: summarize(parsed) };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function callToolJson(client: Client, name: string, args: JsonObject): Promise<JsonObject> {
  const result = await client.callTool({ name, arguments: args });
  const content = Array.isArray((result as { content?: unknown }).content)
    ? ((result as { content: unknown[] }).content)
    : [];
  const textContent = content.find(isTextContent);
  if (result.isError) {
    throw new Error(textContent?.text ?? `${name} returned an MCP error`);
  }
  if (!textContent) {
    throw new Error(`${name} did not return text content`);
  }
  return JSON.parse(textContent.text) as JsonObject;
}

function isTextContent(value: unknown): value is { type: 'text'; text: string } {
  return Boolean(
    value &&
    typeof value === 'object' &&
    (value as { type?: unknown }).type === 'text' &&
    typeof (value as { text?: unknown }).text === 'string',
  );
}

function summarize(value: unknown): unknown {
  if (value && typeof value === 'object' && 'data' in value) {
    const response = value as { data?: unknown; status?: unknown; nextPageToken?: unknown };
    const data = response.data;
    return {
      status: response.status,
      nextPageToken: Boolean(response.nextPageToken),
      data: Array.isArray(data)
        ? {
          type: 'array',
          count: data.length,
          firstKeys: data[0] && typeof data[0] === 'object' ? Object.keys(data[0] as JsonObject).slice(0, 8) : [],
        }
        : data && typeof data === 'object'
          ? { type: 'object', keys: Object.keys(data as JsonObject).slice(0, 8) }
          : { type: typeof data },
    };
  }

  if (Array.isArray(value)) {
    return { type: 'array', count: value.length };
  }

  if (value && typeof value === 'object') {
    return { type: 'object', keys: Object.keys(value as JsonObject).slice(0, 8) };
  }

  return { type: typeof value };
}

function firstGuid(value: unknown): string | undefined {
  if (!value || typeof value !== 'object' || !('data' in value)) {
    return undefined;
  }
  const data = (value as { data?: unknown }).data;
  if (!Array.isArray(data) || !data[0] || typeof data[0] !== 'object') {
    return undefined;
  }
  const guid = (data[0] as JsonObject).guid;
  return typeof guid === 'string' ? guid : undefined;
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
