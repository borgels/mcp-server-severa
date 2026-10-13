import {
  SEVERA_OPENAPI_SOURCE,
  SEVERA_OPENAPI_VERSION,
  SEVERA_OPERATIONS,
  SEVERA_SCHEMAS,
  type SeveraCatalogMethod,
  type SeveraCatalogOperation,
  type SeveraOperationRisk,
} from './openapi-catalog.js';

export type CapabilityRisk = 'read' | 'dry-run' | 'write' | 'destructive';

export interface SeveraCapability {
  id: string;
  title: string;
  description: string;
  risk: CapabilityRisk;
  requiredScopes: string[];
  examples: unknown[];
  identifierFormats: string[];
  safetyNotes: string[];
  keywords: string[];
  operation?: {
    method: SeveraCatalogMethod;
    path: string;
    operationId: string;
    tag: string;
    requestSchema?: string;
    responseSchema?: string;
  };
}

export const READ_TOOL_ANNOTATIONS = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: true,
} as const;

export const DRY_RUN_TOOL_ANNOTATIONS = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: true,
} as const;

export const WRITE_TOOL_ANNOTATIONS = {
  readOnlyHint: false,
  destructiveHint: true,
  idempotentHint: false,
  openWorldHint: true,
} as const;

export const DESTRUCTIVE_TOOL_ANNOTATIONS = {
  readOnlyHint: false,
  destructiveHint: true,
  idempotentHint: false,
  openWorldHint: true,
} as const;

const CURATED_CAPABILITIES: SeveraCapability[] = [
  toolCapability('severa_search_capabilities', 'Search Severa Capabilities', 'Find Severa MCP tools, OpenAPI operations, scopes, and examples.', 'read', [], ['discover', 'help', 'tools', 'openapi']),
  toolCapability('severa_get_capability', 'Get Severa Capability', 'Inspect one capability or OpenAPI operation before calling it.', 'read', [], ['inspect', 'operation', 'scope']),
  toolCapability('severa_get_schema', 'Get Severa Schema', 'Inspect compact OpenAPI schema metadata by schema name.', 'read', [], ['schema', 'model', 'properties']),
  toolCapability('severa_check_connection', 'Check Severa Connection', 'Verify configured Severa credentials against heartbeat/authorized.', 'read', [], ['auth', 'health', 'token']),
  toolCapability('severa_auth_context', 'Get Severa Auth Context', 'Return authentication method and token metadata without exposing secrets.', 'read', [], ['auth', 'scope']),
  toolCapability('severa_search_customers', 'Search Customers', 'Search Severa customers by name, number, VAT, owner, active flag, or changed-since cursor pagination.', 'read', ['customers:read'], ['customers', 'customer', 'vat', 'client']),
  toolCapability('severa_get_customer', 'Get Customer', 'Fetch customer master data by GUID.', 'read', ['customers:read'], ['customer', 'master data']),
  toolCapability('severa_search_contacts', 'Search Contacts', 'Search contact persons globally or for a customer.', 'read', ['customers:read'], ['contacts', 'persons', 'customer']),
  toolCapability('severa_search_projects', 'Search Projects', 'Search projects and sales cases by customer, status, owner, billable state, number, or changed-since filters.', 'read', ['projects:read'], ['projects', 'sales case', 'case', 'billable']),
  toolCapability('severa_get_project', 'Get Project', 'Fetch project details by GUID.', 'read', ['projects:read'], ['project', 'case']),
  toolCapability('severa_project_overview', 'Get Project Overview', 'Fetch a project plus phases, members, work hours, fees, invoices, travel expenses, and files as requested.', 'read', ['projects:read'], ['project', 'overview', 'financials']),
  toolCapability('severa_search_invoices', 'Search Invoices', 'Search invoices and invoice rows, including project invoice context.', 'read', ['invoices:read'], ['invoice', 'billing']),
  toolCapability('severa_search_workhours', 'Search Work Hours', 'Search work hours by date range, user, project, approval, billable status, or changedSince.', 'read', ['hours:read'], ['time', 'hours', 'approval']),
  toolCapability('severa_search_time_entries', 'Search Time Entries', 'Search time entries by user, date range, and pagination.', 'read', ['hours:read'], ['time entries', 'timer']),
  toolCapability('severa_search_fees', 'Search Fees', 'Search project fees, flat rates, and recurring fee rules.', 'read', ['fees:read'], ['fees', 'flat rates', 'recurring']),
  toolCapability('severa_search_travel_expenses', 'Search Travel Expenses', 'Search project travel expenses and reimbursements.', 'read', ['travels:read'], ['travel', 'expenses', 'reimbursement']),
  toolCapability('severa_search_resource_allocations', 'Search Resource Allocations', 'Read resource allocations with documented filters, including the read-style POST search endpoint.', 'read', ['resourceallocations:read'], ['resource allocations', 'planning', 'capacity']),
  toolCapability('severa_search_users', 'Search Users', 'Search users, workdays, work contracts, flextime, and related user data.', 'read', ['users:read'], ['users', 'employees', 'workdays']),
  toolCapability('severa_search_activities', 'Search Activities', 'Search activities and participants.', 'read', ['activities:read'], ['activities', 'calendar']),
  toolCapability('severa_search_files', 'Search Files', 'Search file metadata for projects, customers, invoices, travel expenses, and PDFs.', 'read', ['files:read'], ['files', 'pdf', 'attachments']),
  toolCapability('severa_search_settings', 'Search Settings', 'Read settings/reference data such as business units, products, VAT rates, roles, countries, work types, and statuses.', 'read', ['settings:read'], ['settings', 'reference', 'products', 'vat']),
  toolCapability('severa_get_organization', 'Get Organization', 'Read organization details, organization settings, and Visma Financials integration company info.', 'read', ['organization:read'], ['organization', 'company']),
  toolCapability('severa_rest_read', 'Run Guarded Severa REST Read', 'Run an allowlisted read operation from the Severa OpenAPI catalog.', 'read', ['depends on path'], ['rest', 'read', 'long-tail']),
  toolCapability('severa_prepare_request', 'Prepare Severa Write Request', 'Dry-run a governed Severa write/delete request and return an operation hash.', 'dry-run', ['depends on operation'], ['prepare', 'write', 'delete', 'policy']),
  toolCapability('severa_commit_prepared_request', 'Commit Prepared Severa Request', 'Execute a prepared Severa write/delete request after hash confirmation and policy approval.', 'write', ['depends on operation'], ['commit', 'mutation', 'policy']),
];

export function searchCapabilities(query: string, limit: number): SeveraCapability[] {
  const normalized = query.trim().toLowerCase();
  const capabilities = allCapabilities();
  const scored = capabilities
    .map(capability => ({ capability, score: capabilityScore(capability, normalized) }))
    .filter(item => !normalized || item.score > 0)
    .sort((left, right) => right.score - left.score || left.capability.id.localeCompare(right.capability.id));

  return scored.slice(0, limit).map(item => item.capability);
}

export function getCapability(id: string): SeveraCapability | undefined {
  return allCapabilities().find(capability => capability.id === id);
}

export function getSchema(name: string): unknown {
  return (SEVERA_SCHEMAS as Record<string, unknown>)[name];
}

export function searchSchemas(query: string, limit: number): Array<{ name: string; schema: unknown }> {
  const normalized = query.trim().toLowerCase();
  return Object.entries(SEVERA_SCHEMAS)
    .map(([name, schema]) => ({ name, schema, score: schemaScore(name, schema, normalized) }))
    .filter(item => !normalized || item.score > 0)
    .sort((left, right) => right.score - left.score || left.name.localeCompare(right.name))
    .slice(0, limit)
    .map(({ name, schema }) => ({ name, schema }));
}

export function findOperation(method: string, path: string): SeveraCatalogOperation {
  const normalizedMethod = method.toUpperCase();
  const normalizedPath = normalizePath(path);
  assertSafeRequestPath(normalizedPath);
  const operation = SEVERA_OPERATIONS.find(
    item => item.method === normalizedMethod && normalizePath(item.path) === normalizedPath,
  ) ?? SEVERA_OPERATIONS.find(
    item => item.method === normalizedMethod && pathTemplateRegex(item.path).test(normalizedPath),
  );
  if (!operation) {
    throw new Error(`Severa operation is not allowlisted: ${normalizedMethod} ${path}`);
  }
  return operation;
}

export function findOperationById(operationId: string): SeveraCatalogOperation {
  const operation = SEVERA_OPERATIONS.find(item => item.id === operationId);
  if (!operation) {
    throw new Error(`Unknown Severa operationId: ${operationId}`);
  }
  return operation;
}

export function catalogMetadata(): unknown {
  const risks = countBy(SEVERA_OPERATIONS, item => item.risk);
  const tags = countBy(SEVERA_OPERATIONS, item => item.tag);
  return {
    source: SEVERA_OPENAPI_SOURCE,
    version: SEVERA_OPENAPI_VERSION,
    operations: SEVERA_OPERATIONS.length,
    schemas: Object.keys(SEVERA_SCHEMAS).length,
    risks,
    tags,
  };
}

function allCapabilities(): SeveraCapability[] {
  return [
    ...CURATED_CAPABILITIES,
    ...SEVERA_OPERATIONS.map(operationCapability),
    ...Object.keys(SEVERA_SCHEMAS).map(schemaCapability),
  ];
}

function toolCapability(
  id: string,
  title: string,
  description: string,
  risk: CapabilityRisk,
  requiredScopes: string[],
  keywords: string[],
): SeveraCapability {
  return {
    id,
    title,
    description,
    risk,
    requiredScopes,
    examples: [{ tool: id }],
    identifierFormats: ['Severa GUID strings for entity ids; pageToken/NextPageToken for pagination where documented.'],
    safetyNotes: risk === 'read' || risk === 'dry-run'
      ? ['Does not mutate Severa data.']
      : ['Requires SEVERA_ENABLE_WRITES=true, matching operation hash, and optional policy approval.'],
    keywords,
  };
}

function operationCapability(operation: SeveraCatalogOperation): SeveraCapability {
  return {
    id: `severa_operation_${operation.id}`,
    title: `${operation.method} ${operation.path}`,
    description: operation.summary,
    risk: operationRisk(operation.risk),
    requiredScopes: operation.scopes,
    examples: [{ operationId: operation.id, method: operation.method, path: operation.path }],
    identifierFormats: operation.parameters.map(parameter => `${parameter.in}:${parameter.name}${parameter.required ? ' required' : ''}`),
    safetyNotes: [
      operation.risk === 'read'
        ? 'Callable via severa_rest_read when method/path match this catalog operation.'
        : 'Callable only through prepare/commit flow when policy allows it.',
    ],
    keywords: [operation.id, operation.tag, operation.method, operation.path, ...operation.scopes],
    operation: {
      method: operation.method,
      path: operation.path,
      operationId: operation.id,
      tag: operation.tag,
      requestSchema: operation.requestSchema,
      responseSchema: operation.responseSchema,
    },
  };
}

function schemaCapability(name: string): SeveraCapability {
  return {
    id: `severa_schema_${name}`,
    title: `Schema ${name}`,
    description: `Compact Severa OpenAPI schema metadata for ${name}.`,
    risk: 'read',
    requiredScopes: [],
    examples: [{ name }],
    identifierFormats: ['OpenAPI schema name.'],
    safetyNotes: ['Schema discovery only. Does not call Severa.'],
    keywords: ['schema', name],
  };
}

function operationRisk(risk: SeveraOperationRisk): CapabilityRisk {
  return risk === 'destructive' ? 'destructive' : risk;
}

function capabilityScore(capability: SeveraCapability, query: string): number {
  if (!query) {
    return 1;
  }

  const haystacks = [
    capability.id,
    capability.title,
    capability.description,
    capability.risk,
    ...capability.requiredScopes,
    ...capability.keywords,
    capability.operation?.path,
    capability.operation?.operationId,
    capability.operation?.tag,
  ]
    .filter(Boolean)
    .map(item => String(item).toLowerCase());

  return haystacks.reduce((score, item) => {
    if (item === query) return score + 20;
    if (item.includes(query)) return score + 5;
    return score + query.split(/\s+/).filter(term => item.includes(term)).length;
  }, 0);
}

function schemaScore(name: string, schema: unknown, query: string): number {
  if (!query) {
    return 1;
  }
  const text = `${name} ${JSON.stringify(schema)}`.toLowerCase();
  return text.includes(query) ? 10 : query.split(/\s+/).filter(term => text.includes(term)).length;
}

function countBy<T>(items: readonly T[], key: (item: T) => string): Record<string, number> {
  return items.reduce<Record<string, number>>((counts, item) => {
    const value = key(item);
    counts[value] = (counts[value] ?? 0) + 1;
    return counts;
  }, {});
}

function normalizePath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

/**
 * Reject request paths that could change meaning after URL parsing: query or
 * fragment delimiters, backslashes, percent-encoding and dot segments.
 */
export function assertSafeRequestPath(path: string): void {
  if (/[?#%\\]/.test(path) || path.split('/').some(segment => segment === '.' || segment === '..')) {
    throw new Error('Severa request path contains disallowed characters or segments.');
  }
}

// One path parameter value: letters, digits and the punctuation used by
// GUIDs, ISO dates and country names. No '/', '?', '#', '%' or '\\'.
const PATH_PARAM_PATTERN = "[\\p{L}\\p{N}_~:+ .-]+";

function pathTemplateRegex(path: string): RegExp {
  const pattern = normalizePath(path)
    .split('/')
    .map(segment => {
      if (/^\{[^}]+\}$/.test(segment)) {
        return PATH_PARAM_PATTERN;
      }
      return segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    })
    .join('/');
  return new RegExp(`^${pattern}$`, 'u');
}
