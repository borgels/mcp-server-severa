import { catalogMetadata, getSchema, searchCapabilities } from './severa/capabilities.js';
import { SeveraClient, type SeveraClientOptions, type SeveraQueryValue } from './severa/client.js';
import { assertAllowedReadOperation, guidParam } from './severa/requests.js';

export type GatewayRiskLevel = 'read' | 'write' | 'destructive';
export type GatewayJsonValue = string | number | boolean | null | GatewayJsonValue[] | { [key: string]: GatewayJsonValue };
export type GatewayJsonObject = { [key: string]: GatewayJsonValue };

export interface GatewayToolDefinition {
  name: string;
  title: string;
  description: string;
  riskLevel: GatewayRiskLevel;
  enabledByDefault: boolean;
  inputSchema: GatewayJsonObject;
}

export interface GatewayToolResult {
  content: Array<{ type: 'text'; text: string }>;
  structuredContent?: GatewayJsonValue;
  isError?: boolean;
}

export interface SeveraGatewayOptions extends SeveraClientOptions {}

const emptyInput = { type: 'object', properties: {}, additionalProperties: false } satisfies GatewayJsonObject;
const guid = { type: 'string', description: 'Severa GUID.' } satisfies GatewayJsonObject;
const pagination = {
  pageToken: { type: 'string' },
  rowCount: { type: 'number', minimum: 1, maximum: 100 },
  changedSince: { type: 'string' },
} satisfies Record<string, GatewayJsonObject>;

export const severaGatewayTools: GatewayToolDefinition[] = [
  {
    name: 'search_capabilities',
    title: 'Search Severa capabilities',
    description: 'Find supported Severa tools, OpenAPI operations, scopes, and schemas.',
    riskLevel: 'read',
    enabledByDefault: true,
    inputSchema: {
      type: 'object',
      properties: { query: { type: 'string' }, limit: { type: 'number', minimum: 1, maximum: 100 } },
      additionalProperties: false,
    },
  },
  {
    name: 'check_connection',
    title: 'Check Severa connection',
    description: 'Verify configured Severa credentials.',
    riskLevel: 'read',
    enabledByDefault: true,
    inputSchema: emptyInput,
  },
  {
    name: 'get_schema',
    title: 'Get Severa schema',
    description: 'Inspect compact Severa OpenAPI schema metadata.',
    riskLevel: 'read',
    enabledByDefault: true,
    inputSchema: {
      type: 'object',
      properties: { name: { type: 'string' } },
      required: ['name'],
      additionalProperties: false,
    },
  },
  {
    name: 'search_customers',
    title: 'Search Severa customers',
    description: 'Search customers with common filters.',
    riskLevel: 'read',
    enabledByDefault: true,
    inputSchema: {
      type: 'object',
      properties: {
        customerNames: { type: 'array', items: { type: 'string' } },
        numbers: { type: 'array', items: { type: 'number' } },
        vatNumber: { type: 'string' },
        isActive: { type: 'boolean' },
        ...pagination,
      },
      additionalProperties: false,
    },
  },
  {
    name: 'get_customer',
    title: 'Get Severa customer',
    description: 'Fetch one customer by GUID.',
    riskLevel: 'read',
    enabledByDefault: true,
    inputSchema: { type: 'object', required: ['customerGuid'], properties: { customerGuid: guid }, additionalProperties: false },
  },
  {
    name: 'search_projects',
    title: 'Search Severa projects',
    description: 'Search projects or sales cases with common filters.',
    riskLevel: 'read',
    enabledByDefault: true,
    inputSchema: {
      type: 'object',
      properties: {
        salesCases: { type: 'boolean' },
        customerGuids: { type: 'array', items: { type: 'string' } },
        projectOwnerGuids: { type: 'array', items: { type: 'string' } },
        isClosed: { type: 'boolean' },
        isBillable: { type: 'boolean' },
        ...pagination,
      },
      additionalProperties: false,
    },
  },
  {
    name: 'get_project',
    title: 'Get Severa project',
    description: 'Fetch one project by GUID.',
    riskLevel: 'read',
    enabledByDefault: true,
    inputSchema: { type: 'object', required: ['projectGuid'], properties: { projectGuid: guid }, additionalProperties: false },
  },
  {
    name: 'rest_read',
    title: 'Run guarded Severa REST read',
    description: 'Run an allowlisted read operation from the Severa OpenAPI catalog.',
    riskLevel: 'read',
    enabledByDefault: true,
    inputSchema: {
      type: 'object',
      required: ['path'],
      properties: {
        method: { type: 'string', enum: ['GET', 'POST'] },
        path: { type: 'string' },
        query: { type: 'object', additionalProperties: true },
        body: { type: 'object', additionalProperties: true },
      },
      additionalProperties: false,
    },
  },
];

export function createSeveraGateway(options: SeveraGatewayOptions = {}) {
  const client = new SeveraClient(options);

  return {
    tools: severaGatewayTools,
    async callTool(toolName: string, input: GatewayJsonObject = {}): Promise<GatewayToolResult> {
      switch (toolName) {
        case 'search_capabilities':
          return jsonResult('Found Severa capabilities.', searchCapabilities(stringValue(input.query) ?? '', numberValue(input.limit) ?? 25));

        case 'check_connection':
          return jsonResult('Severa connection is available.', {
            authorized: await client.get('/heartbeat/authorized'),
            catalog: catalogMetadata(),
          });

        case 'get_schema':
          return jsonResult('Fetched Severa schema.', getSchema(requiredString(input.name, 'name')) ?? null);

        case 'search_customers':
          return jsonResult('Fetched Severa customers.', await client.get('/v1/customers', queryValues(input)));

        case 'get_customer':
          return jsonResult('Fetched Severa customer.', await client.get(`/v1/customers/${guidParam(requiredString(input.customerGuid, 'customerGuid'))}`));

        case 'search_projects': {
          const path = input.salesCases === true ? '/v1/salescases' : '/v1/projects';
          return jsonResult('Fetched Severa projects.', await client.get(path, queryValues(input)));
        }

        case 'get_project':
          return jsonResult('Fetched Severa project.', await client.get(`/v1/projects/${guidParam(requiredString(input.projectGuid, 'projectGuid'))}`));

        case 'rest_read': {
          const method = (stringValue(input.method) ?? 'GET').toUpperCase() as 'GET' | 'POST';
          const path = requiredString(input.path, 'path');
          const query = objectValue(input.query);
          assertAllowedReadOperation(method, path);
          const result = method === 'POST' ? await client.post(path, query, input.body) : await client.get(path, query);
          return jsonResult('Fetched Severa data.', result);
        }

        default:
          return errorResult(`Unsupported Severa gateway tool: ${toolName}`);
      }
    },
  };
}

function queryValues(input: GatewayJsonObject): Record<string, SeveraQueryValue> {
  const query: Record<string, SeveraQueryValue> = {};
  for (const [key, value] of Object.entries(input)) {
    if (['salesCases', 'method', 'path', 'body', 'query'].includes(key)) continue;
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value === null) {
      query[key] = value;
    } else if (Array.isArray(value)) {
      query[key] = value.filter(item => typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean') as Array<string | number | boolean>;
    }
  }
  return query;
}

function objectValue(value: GatewayJsonValue | undefined): Record<string, SeveraQueryValue> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }
  return queryValues(value);
}

function stringValue(value: GatewayJsonValue | undefined): string | undefined {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined;
}

function requiredString(value: GatewayJsonValue | undefined, name: string): string {
  const parsed = stringValue(value);
  if (!parsed) {
    throw new Error(`Missing required input: ${name}`);
  }
  return parsed;
}

function numberValue(value: GatewayJsonValue | undefined): number | undefined {
  return typeof value === 'number' ? value : undefined;
}

function jsonResult(text: string, structuredContent: unknown): GatewayToolResult {
  return {
    content: [{ type: 'text', text }],
    structuredContent: JSON.parse(JSON.stringify(structuredContent ?? null)) as GatewayJsonValue,
  };
}

function errorResult(text: string): GatewayToolResult {
  return {
    isError: true,
    content: [{ type: 'text', text }],
  };
}
