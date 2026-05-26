import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod/v4';
import { formatUnknownError } from '../errors.js';
import { writeAuditEvent } from '../severa/audit.js';
import {
  catalogMetadata,
  getCapability,
  getSchema,
  READ_TOOL_ANNOTATIONS,
  searchCapabilities,
  searchSchemas,
  WRITE_TOOL_ANNOTATIONS,
  DRY_RUN_TOOL_ANNOTATIONS,
} from '../severa/capabilities.js';
import { type SeveraClient, type SeveraHttpMethod, type SeveraQueryValue, paginationQuery } from '../severa/client.js';
import { checkRequestPolicy, checkToolPolicy } from '../severa/policy.js';
import {
  assertAllowedReadOperation,
  assertPreparedRequestHash,
  prepareSeveraRequest,
} from '../severa/requests.js';

const guidSchema = z.string().trim().min(1);
const isoDateSchema = z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD.');
const isoDateTimeSchema = z.string().trim().min(1);
const querySchema = z.record(z.string(), z.unknown()).default({});
const bodySchema = z.unknown().optional();
const paginationInputShape = {
  pageToken: z.string().trim().min(1).optional(),
  rowCount: z.number().int().min(1).max(100).default(20),
  changedSince: isoDateTimeSchema.optional(),
};

const preparedRequestSchema = z.object({
  type: z.literal('severa_prepared_request'),
  createdAt: z.string().trim().min(1),
  method: z.enum(['POST', 'PUT', 'PATCH', 'DELETE']),
  path: z.string().trim().min(1),
  query: z.record(z.string(), z.unknown()).default({}),
  body: z.unknown().optional(),
  reason: z.string().trim().min(1),
  operation: z.string().trim().min(1),
  operationId: z.string().trim().min(1),
  scopes: z.array(z.string().trim().min(1)).default([]),
  risk: z.enum(['write', 'destructive']),
  operationHash: z.string().trim().min(1),
});

export function registerSeveraTools(server: McpServer, client: SeveraClient): void {
  server.registerTool(
    'severa_search_capabilities',
    {
      title: 'Search Severa Capabilities',
      description: 'Search Severa MCP tools, OpenAPI operations, scopes, and schemas. Use this first when deciding which Severa tool to call.',
      inputSchema: {
        query: z.string().trim().default(''),
        limit: z.number().int().min(1).max(100).default(25),
      },
      annotations: READ_TOOL_ANNOTATIONS,
    },
    async input => runAuditedTool('severa_search_capabilities', input, async () => jsonToolResult(searchCapabilities(input.query, input.limit))),
  );

  server.registerTool(
    'severa_get_capability',
    {
      title: 'Get Severa Capability',
      description: 'Return details for one Severa capability id, including generated operation capabilities.',
      inputSchema: { id: z.string().trim().min(1) },
      annotations: READ_TOOL_ANNOTATIONS,
    },
    async input => runAuditedTool('severa_get_capability', input, async () => jsonToolResult(getCapability(input.id) ?? { error: 'not_found', id: input.id })),
  );

  server.registerTool(
    'severa_get_schema',
    {
      title: 'Get Severa Schema',
      description: 'Inspect compact Severa OpenAPI schema metadata by name, or search schema names/properties.',
      inputSchema: {
        name: z.string().trim().min(1).optional(),
        query: z.string().trim().optional(),
        limit: z.number().int().min(1).max(100).default(20),
      },
      annotations: READ_TOOL_ANNOTATIONS,
    },
    async input => runAuditedTool('severa_get_schema', input, async () => {
      if (input.name) {
        return jsonToolResult(getSchema(input.name) ?? { error: 'not_found', name: input.name });
      }
      return jsonToolResult(searchSchemas(input.query ?? '', input.limit));
    }),
  );

  server.registerTool(
    'severa_check_connection',
    {
      title: 'Check Severa Connection',
      description: 'Verify configured Severa credentials against /heartbeat/authorized and return catalog metadata.',
      inputSchema: {},
      annotations: READ_TOOL_ANNOTATIONS,
    },
    async input => runAuditedTool('severa_check_connection', input, async () => {
      const authorized = await client.get('/heartbeat/authorized');
      return jsonToolResult({ ok: true, authorized, catalog: catalogMetadata() });
    }),
  );

  server.registerTool(
    'severa_auth_context',
    {
      title: 'Get Severa Auth Context',
      description: 'Return Severa authentication method and token metadata without exposing configured secrets.',
      inputSchema: {},
      annotations: READ_TOOL_ANNOTATIONS,
    },
    async input => runAuditedTool('severa_auth_context', input, async () => jsonToolResult(await client.getTokenMetadata())),
  );

  server.registerTool(
    'severa_search_customers',
    {
      title: 'Search Severa Customers',
      description: 'Search customers by name, number, VAT, email, owner, active/internal flags, changedSince, and page token.',
      inputSchema: {
        customerNames: z.array(z.string().trim().min(1)).max(100).optional(),
        numbers: z.array(z.number().int()).max(100).optional(),
        vatNumber: z.string().trim().min(1).optional(),
        emailAddresses: z.array(z.string().trim().min(1)).max(100).optional(),
        customerOwnerGuids: z.array(guidSchema).max(100).optional(),
        isActive: z.boolean().optional(),
        isInternal: z.boolean().optional(),
        ...paginationInputShape,
      },
      annotations: READ_TOOL_ANNOTATIONS,
    },
    async input => runAuditedTool('severa_search_customers', input, async () => jsonToolResult(await client.get('/v1/customers', queryValues(input)))),
  );

  server.registerTool(
    'severa_get_customer',
    {
      title: 'Get Severa Customer',
      description: 'Fetch one Severa customer by GUID.',
      inputSchema: { customerGuid: guidSchema },
      annotations: READ_TOOL_ANNOTATIONS,
    },
    async input => runAuditedTool('severa_get_customer', input, async () => jsonToolResult(await client.get(`/v1/customers/${input.customerGuid}`))),
  );

  server.registerTool(
    'severa_search_contacts',
    {
      title: 'Search Severa Contacts',
      description: 'Search contact persons globally or under one customer.',
      inputSchema: {
        customerGuid: guidSchema.optional(),
        ...paginationInputShape,
      },
      annotations: READ_TOOL_ANNOTATIONS,
    },
    async input => runAuditedTool('severa_search_contacts', input, async () => {
      const path = input.customerGuid ? `/v1/customers/${input.customerGuid}/contactpersons` : '/v1/contactpersons';
      return jsonToolResult(await client.get(path, paginationQuery(input)));
    }),
  );

  server.registerTool(
    'severa_search_projects',
    {
      title: 'Search Severa Projects',
      description: 'Search projects or sales cases by customer, owner, status, billable state, number, and changedSince filters.',
      inputSchema: {
        salesCases: z.boolean().default(false),
        customerGuids: z.array(guidSchema).max(100).optional(),
        projectGuids: z.array(guidSchema).max(100).optional(),
        projectOwnerGuids: z.array(guidSchema).max(100).optional(),
        salesPersonGuids: z.array(guidSchema).max(100).optional(),
        businessUnitGuids: z.array(guidSchema).max(100).optional(),
        projectStatusTypeGuids: z.array(guidSchema).max(100).optional(),
        numbers: z.array(z.number().int()).max(100).optional(),
        isClosed: z.boolean().optional(),
        isBillable: z.boolean().optional(),
        internal: z.boolean().optional(),
        ...paginationInputShape,
      },
      annotations: READ_TOOL_ANNOTATIONS,
    },
    async input => runAuditedTool('severa_search_projects', input, async () => {
      const path = input.salesCases ? '/v1/salescases' : '/v1/projects';
      const { salesCases: _salesCases, ...query } = input;
      return jsonToolResult(await client.get(path, queryValues(query)));
    }),
  );

  server.registerTool(
    'severa_get_project',
    {
      title: 'Get Severa Project',
      description: 'Fetch one Severa project by GUID.',
      inputSchema: { projectGuid: guidSchema },
      annotations: READ_TOOL_ANNOTATIONS,
    },
    async input => runAuditedTool('severa_get_project', input, async () => jsonToolResult(await client.get(`/v1/projects/${input.projectGuid}`))),
  );

  server.registerTool(
    'severa_project_overview',
    {
      title: 'Get Severa Project Overview',
      description: 'Fetch a project plus selected related project resources such as phases, members, work hours, fees, invoices, travel expenses, and files.',
      inputSchema: {
        projectGuid: guidSchema,
        includePhases: z.boolean().default(true),
        includeMembers: z.boolean().default(true),
        includeWorkHours: z.boolean().default(true),
        includeFees: z.boolean().default(true),
        includeInvoices: z.boolean().default(true),
        includeTravelExpenses: z.boolean().default(false),
        includeFiles: z.boolean().default(false),
        rowCount: z.number().int().min(1).max(100).default(50),
      },
      annotations: READ_TOOL_ANNOTATIONS,
    },
    async input => runAuditedTool('severa_project_overview', input, async () => {
      const query = { rowCount: input.rowCount };
      const result: Record<string, unknown> = {
        project: await client.get(`/v1/projects/${input.projectGuid}`),
      };

      if (input.includePhases || input.includeMembers) {
        const phases = await client.get(`/v1/projects/${input.projectGuid}/phaseswithhierarchy`, query);
        result.phases = phases;

        if (input.includeMembers && Array.isArray(phases.data)) {
          result.phaseMembers = await Promise.all(
            phases.data
              .map(item => guidFromRecord(item))
              .filter((guid): guid is string => Boolean(guid))
              .slice(0, input.rowCount)
              .map(async phaseGuid => ({
                phaseGuid,
                members: await client.get(`/v1/phases/${phaseGuid}/phasemembers`, query),
              })),
          );
        }
      }

      const entries = await Promise.all([
        input.includeWorkHours ? named('workHours', client.get(`/v1/projects/${input.projectGuid}/workhours`, query)) : undefined,
        input.includeFees ? named('projectFees', client.get(`/v1/projects/${input.projectGuid}/projectfees`, query)) : undefined,
        input.includeInvoices ? named('invoiceSettings', client.get(`/v1/projects/${input.projectGuid}/projectinvoicesettings`, query)) : undefined,
        input.includeTravelExpenses ? named('travelExpenses', client.get(`/v1/projects/${input.projectGuid}/projecttravelexpenses`, query)) : undefined,
        input.includeFiles ? named('files', client.get(`/v1/projects/${input.projectGuid}/files`, query)) : undefined,
      ]);
      Object.assign(result, Object.fromEntries(entries.filter(Boolean) as Array<[string, unknown]>));
      return jsonToolResult(result);
    }),
  );

  server.registerTool(
    'severa_search_invoices',
    {
      title: 'Search Severa Invoices',
      description: 'Search invoices or invoice-related rows/resources.',
      inputSchema: {
        invoiceGuid: guidSchema.optional(),
        projectGuid: guidSchema.optional(),
        collection: z.enum(['invoices', 'rows', 'settings', 'workhours', 'uninvoiced_workhours', 'projectfees', 'travel_expenses']).default('invoices'),
        ...paginationInputShape,
      },
      annotations: READ_TOOL_ANNOTATIONS,
    },
    async input => runAuditedTool('severa_search_invoices', input, async () => jsonToolResult(await client.get(invoicePath(input), paginationQuery(input)))),
  );

  server.registerTool(
    'severa_search_workhours',
    {
      title: 'Search Severa Work Hours',
      description: 'Search work hours by global, user, or project scope plus date range, approval, billable status, and pagination.',
      inputSchema: {
        userGuid: guidSchema.optional(),
        projectGuid: guidSchema.optional(),
        eventDateStart: isoDateSchema.optional(),
        eventDateEnd: isoDateSchema.optional(),
        isApproved: z.boolean().optional(),
        billableStatus: z.string().trim().min(1).optional(),
        ...paginationInputShape,
      },
      annotations: READ_TOOL_ANNOTATIONS,
    },
    async input => runAuditedTool('severa_search_workhours', input, async () => {
      const path = input.userGuid ? `/v1/users/${input.userGuid}/workhours` : input.projectGuid ? `/v1/projects/${input.projectGuid}/workhours` : '/v1/workhours';
      const { userGuid: _userGuid, projectGuid: _projectGuid, ...query } = input;
      return jsonToolResult(await client.get(path, queryValues(query)));
    }),
  );

  server.registerTool(
    'severa_search_time_entries',
    {
      title: 'Search Severa Time Entries',
      description: 'Search time entries globally or for one user.',
      inputSchema: {
        userGuid: guidSchema.optional(),
        eventDateStart: isoDateSchema.optional(),
        eventDateEnd: isoDateSchema.optional(),
        ...paginationInputShape,
      },
      annotations: READ_TOOL_ANNOTATIONS,
    },
    async input => runAuditedTool('severa_search_time_entries', input, async () => {
      const path = input.userGuid ? `/v1/users/${input.userGuid}/timeentries` : '/v1/timeentries';
      const { userGuid: _userGuid, ...query } = input;
      return jsonToolResult(await client.get(path, queryValues(query)));
    }),
  );

  server.registerTool(
    'severa_search_fees',
    {
      title: 'Search Severa Fees',
      description: 'Search project fees, flat rates, and recurring fee rules.',
      inputSchema: {
        projectGuid: guidSchema.optional(),
        userGuid: guidSchema.optional(),
        collection: z.enum(['projectfees', 'flatrates', 'recurringfeerules', 'deletedprojectfees']).default('projectfees'),
        ...paginationInputShape,
      },
      annotations: READ_TOOL_ANNOTATIONS,
    },
    async input => runAuditedTool('severa_search_fees', input, async () => jsonToolResult(await client.get(feePath(input), paginationQuery(input)))),
  );

  server.registerTool(
    'severa_search_travel_expenses',
    {
      title: 'Search Severa Travel Expenses',
      description: 'Search project travel expenses or travel reimbursements.',
      inputSchema: {
        projectGuid: guidSchema.optional(),
        userGuid: guidSchema.optional(),
        travelReimbursementGuid: guidSchema.optional(),
        collection: z.enum(['projecttravelexpenses', 'travelreimbursements', 'deletedprojecttravelexpenses']).default('projecttravelexpenses'),
        ...paginationInputShape,
      },
      annotations: READ_TOOL_ANNOTATIONS,
    },
    async input => runAuditedTool('severa_search_travel_expenses', input, async () => jsonToolResult(await client.get(travelPath(input), paginationQuery(input)))),
  );

  server.registerTool(
    'severa_search_resource_allocations',
    {
      title: 'Search Severa Resource Allocations',
      description: 'Search resource allocations with simple GET scopes or the documented read-style POST criteria endpoint.',
      inputSchema: {
        projectGuid: guidSchema.optional(),
        userGuid: guidSchema.optional(),
        phaseGuid: guidSchema.optional(),
        useCriteriaPost: z.boolean().default(false),
        criteria: z.record(z.string(), z.unknown()).optional(),
        ...paginationInputShape,
      },
      annotations: READ_TOOL_ANNOTATIONS,
    },
    async input => runAuditedTool('severa_search_resource_allocations', input, async () => {
      const query = paginationQuery(input);
      if (input.useCriteriaPost) {
        return jsonToolResult(await client.post('/v1/resourceallocations/allocations', query, input.criteria ?? {}));
      }
      const path = input.userGuid
        ? `/v1/users/${input.userGuid}/resourceallocations/allocations`
        : input.projectGuid
          ? `/v1/projects/${input.projectGuid}/resourceallocations/allocations`
          : input.phaseGuid
            ? `/v1/phases/${input.phaseGuid}/resourceallocations/allocations`
            : '/v1/resourceallocations';
      return jsonToolResult(await client.get(path, query));
    }),
  );

  server.registerTool(
    'severa_search_users',
    {
      title: 'Search Severa Users',
      description: 'Search users and related user resources.',
      inputSchema: {
        userGuid: guidSchema.optional(),
        date: isoDateSchema.optional(),
        collection: z.enum(['users', 'workdays', 'workcontracts', 'current_workcontract', 'flextime', 'flextimeadjustments', 'customvalues']).default('users'),
        ...paginationInputShape,
      },
      annotations: READ_TOOL_ANNOTATIONS,
    },
    async input => runAuditedTool('severa_search_users', input, async () => jsonToolResult(await client.get(userPath(input), paginationQuery(input)))),
  );

  server.registerTool(
    'severa_search_activities',
    {
      title: 'Search Severa Activities',
      description: 'Search activities or activity participants.',
      inputSchema: {
        activityGuid: guidSchema.optional(),
        collection: z.enum(['activities', 'participants']).default('activities'),
        closed: z.boolean().optional(),
        startDate: isoDateSchema.optional(),
        endDate: isoDateSchema.optional(),
        ...paginationInputShape,
      },
      annotations: READ_TOOL_ANNOTATIONS,
    },
    async input => runAuditedTool('severa_search_activities', input, async () => {
      const path = input.collection === 'participants' && input.activityGuid
        ? `/v1/activities/${input.activityGuid}/activityparticipants`
        : '/v1/activities';
      const { activityGuid: _activityGuid, collection: _collection, ...query } = input;
      return jsonToolResult(await client.get(path, queryValues(query)));
    }),
  );

  server.registerTool(
    'severa_search_files',
    {
      title: 'Search Severa Files',
      description: 'Search file metadata and PDF resources for projects, customers, invoices, and travel reimbursements.',
      inputSchema: {
        projectGuid: guidSchema.optional(),
        customerGuid: guidSchema.optional(),
        invoiceGuid: guidSchema.optional(),
        travelReimbursementGuid: guidSchema.optional(),
        projectTravelExpenseGuid: guidSchema.optional(),
        fileGuid: guidSchema.optional(),
        collection: z.enum(['project_files', 'customer_files', 'invoice_files', 'travel_expense_files', 'file', 'filedata', 'invoice_pdf', 'travel_reimbursement_pdf']).default('project_files'),
        ...paginationInputShape,
      },
      annotations: READ_TOOL_ANNOTATIONS,
    },
    async input => runAuditedTool('severa_search_files', input, async () => jsonToolResult(await client.get(filePath(input), paginationQuery(input)))),
  );

  server.registerTool(
    'severa_search_settings',
    {
      title: 'Search Severa Settings',
      description: 'Read Severa settings/reference resources by allowlisted path, such as /v1/businessunits, /v1/products, /v1/vatrates, /v1/worktypes, or /v1/currencies.',
      inputSchema: {
        path: z.string().trim().min(1).default('/v1/businessunits'),
        query: querySchema,
      },
      annotations: READ_TOOL_ANNOTATIONS,
    },
    async input => runAuditedTool('severa_search_settings', input, async () => {
      assertAllowedReadOperation('GET', input.path);
      return jsonToolResult(await client.get(input.path, queryValues(input.query)));
    }),
  );

  server.registerTool(
    'severa_get_organization',
    {
      title: 'Get Severa Organization',
      description: 'Read organization details, organization settings, or Visma Financials integration company info.',
      inputSchema: {
        resource: z.enum(['details', 'settings', 'visma_financials_company']).default('details'),
      },
      annotations: READ_TOOL_ANNOTATIONS,
    },
    async input => runAuditedTool('severa_get_organization', input, async () => jsonToolResult(await client.get(organizationPath(input.resource)))),
  );

  server.registerTool(
    'severa_rest_read',
    {
      title: 'Run Guarded Severa REST Read',
      description: 'Run an allowlisted read operation from the Severa OpenAPI catalog. Supports GET and documented read-style POST operations.',
      inputSchema: {
        method: z.enum(['GET', 'POST']).default('GET'),
        path: z.string().trim().min(1),
        query: querySchema,
        body: bodySchema,
      },
      annotations: READ_TOOL_ANNOTATIONS,
    },
    async input => runAuditedTool('severa_rest_read', input, async () => {
      assertAllowedReadOperation(input.method, input.path);
      const result = input.method === 'POST'
        ? await client.post(input.path, queryValues(input.query), input.body)
        : await client.get(input.path, queryValues(input.query));
      return jsonToolResult(result);
    }),
  );

  server.registerTool(
    'severa_prepare_request',
    {
      title: 'Prepare Severa Write Request',
      description: 'Dry-run a governed Severa write/delete request. Returns a prepared request and operation hash; does not call Severa.',
      inputSchema: {
        method: z.enum(['POST', 'PUT', 'PATCH', 'DELETE']),
        path: z.string().trim().min(1),
        query: querySchema,
        body: bodySchema,
        reason: z.string().trim().min(1),
      },
      annotations: DRY_RUN_TOOL_ANNOTATIONS,
    },
    async input => runAuditedTool('severa_prepare_request', input, async () => jsonToolResult(prepareSeveraRequest({ ...input, query: queryValues(input.query) }))),
  );

  server.registerTool(
    'severa_commit_prepared_request',
    {
      title: 'Commit Prepared Severa Request',
      description: 'Execute a previously prepared Severa write/delete request after hash confirmation and policy checks.',
      inputSchema: {
        preparedRequest: preparedRequestSchema,
        confirmOperationHash: z.string().trim().min(1),
        idempotencyKey: z.string().trim().min(8),
      },
      annotations: WRITE_TOOL_ANNOTATIONS,
    },
    async input => runAuditedTool('severa_commit_prepared_request', input, async () => {
      const preparedRequest = {
        ...input.preparedRequest,
        query: queryValues(input.preparedRequest.query),
      };
      assertPreparedRequestHash(preparedRequest, input.confirmOperationHash);
      const decision = await checkRequestPolicy(preparedRequest);
      if (!decision.allowed) {
        await writeAuditEvent({
          tool: 'severa_commit_prepared_request',
          action: 'policy_denied',
          target: auditTarget(input),
          reason: decision.reason,
          operationHash: input.confirmOperationHash,
          idempotencyKey: input.idempotencyKey,
        });
        throw new Error(decision.reason);
      }

      const result = await client.request({
        method: preparedRequest.method,
        path: preparedRequest.path,
        query: preparedRequest.query,
        body: preparedRequest.body,
      });
      return jsonToolResult(result);
    }, { operationHash: input.confirmOperationHash, idempotencyKey: input.idempotencyKey }),
  );
}

async function runAuditedTool<T>(
  tool: string,
  input: unknown,
  call: () => Promise<T>,
  auditOptions: { operationHash?: string; idempotencyKey?: string } = {},
): Promise<T> {
  const policy = checkToolPolicy(tool);
  const target = auditTarget(input);

  if (!policy.allowed) {
    await writeAuditEvent({ tool, action: 'policy_denied', target, reason: policy.reason, ...auditOptions });
    throw new Error(policy.reason);
  }

  await writeAuditEvent({ tool, action: 'start', target, reason: policy.reason, ...auditOptions });

  try {
    const result = await call();
    await writeAuditEvent({ tool, action: 'finish', target, status: 'ok', ...auditOptions });
    return result;
  } catch (error) {
    await writeAuditEvent({ tool, action: 'error', target, status: 'error', error: formatUnknownError(error), ...auditOptions });
    throw error;
  }
}

async function named(name: string, value: Promise<unknown>): Promise<[string, unknown]> {
  try {
    return [name, await value];
  } catch (error) {
    return [name, { error: formatUnknownError(error) }];
  }
}

function guidFromRecord(value: unknown): string | undefined {
  if (!value || typeof value !== 'object') {
    return undefined;
  }
  const guid = (value as Record<string, unknown>).guid;
  return typeof guid === 'string' && guid.length > 0 ? guid : undefined;
}

function queryValues(value: Record<string, unknown>): Record<string, SeveraQueryValue> {
  const query: Record<string, SeveraQueryValue> = {};
  for (const [key, item] of Object.entries(value)) {
    if (item === undefined || item === null || key === 'collection') continue;
    if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean') {
      query[key] = item;
    } else if (Array.isArray(item)) {
      query[key] = item.filter(isQueryArrayValue);
    }
  }
  return query;
}

function isQueryArrayValue(value: unknown): value is string | number | boolean {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
}

function invoicePath(input: { invoiceGuid?: string; projectGuid?: string; collection: string }): string {
  if (input.invoiceGuid) {
    const suffixes: Record<string, string> = {
      invoices: '',
      rows: '/invoicerows',
      settings: '/invoicesettings',
      workhours: '/workhours',
      uninvoiced_workhours: '/uninvoicedworkhours',
      projectfees: '/projectfees',
      travel_expenses: '/projecttravelexpenses',
    };
    return `/v1/invoices/${input.invoiceGuid}${suffixes[input.collection] ?? ''}`;
  }
  if (input.projectGuid && input.collection === 'settings') {
    return `/v1/projects/${input.projectGuid}/projectinvoicesettings`;
  }
  return input.collection === 'rows' ? '/v1/invoicerows' : '/v1/invoices';
}

function feePath(input: { projectGuid?: string; userGuid?: string; collection: string }): string {
  if (input.collection === 'flatrates') {
    return input.projectGuid ? `/v1/projects/${input.projectGuid}/flatrates` : '/v1/flatrates';
  }
  if (input.collection === 'recurringfeerules') {
    return input.projectGuid ? `/v1/projects/${input.projectGuid}/projectrecurringfeerules` : '/v1/projectrecurringfeerules';
  }
  if (input.collection === 'deletedprojectfees') {
    return '/v1/deletedprojectfees';
  }
  if (input.userGuid) {
    return `/v1/users/${input.userGuid}/projectfees`;
  }
  return input.projectGuid ? `/v1/projects/${input.projectGuid}/projectfees` : '/v1/projectfees';
}

function travelPath(input: { projectGuid?: string; userGuid?: string; travelReimbursementGuid?: string; collection: string }): string {
  if (input.collection === 'travelreimbursements') {
    return '/v1/travelreimbursements';
  }
  if (input.collection === 'deletedprojecttravelexpenses') {
    return '/v1/deletedprojecttravelexpenses';
  }
  if (input.travelReimbursementGuid) {
    return `/v1/travelreimbursements/${input.travelReimbursementGuid}/projecttravelexpenses`;
  }
  if (input.userGuid) {
    return `/v1/users/${input.userGuid}/projecttravelexpenses`;
  }
  return input.projectGuid ? `/v1/projects/${input.projectGuid}/projecttravelexpenses` : '/v1/projecttravelexpenses';
}

function userPath(input: { userGuid?: string; date?: string; collection: string }): string {
  if (!input.userGuid) {
    return input.collection === 'workdays' ? '/v1/workdays' : '/v1/users';
  }
  const paths: Record<string, string> = {
    users: `/v1/users/${input.userGuid}`,
    workdays: `/v1/users/${input.userGuid}/workdays`,
    workcontracts: `/v1/users/${input.userGuid}/workcontracts`,
    current_workcontract: `/v1/users/${input.userGuid}/workcontracts/current`,
    flextime: `/v1/users/${input.userGuid}/flextime`,
    flextimeadjustments: `/v1/users/${input.userGuid}/flextimeadjustments`,
    customvalues: `/v1/users/${input.userGuid}/customvalues`,
  };
  return paths[input.collection] ?? `/v1/users/${input.userGuid}`;
}

function filePath(input: {
  projectGuid?: string;
  customerGuid?: string;
  invoiceGuid?: string;
  travelReimbursementGuid?: string;
  projectTravelExpenseGuid?: string;
  fileGuid?: string;
  collection: string;
}): string {
  switch (input.collection) {
    case 'customer_files':
      return input.customerGuid ? `/v1/customers/${input.customerGuid}/files` : '/v1/customerfiles';
    case 'invoice_files':
      return input.invoiceGuid ? `/v1/invoices/${input.invoiceGuid}/files` : '/v1/invoicefiles';
    case 'travel_expense_files':
      return input.projectTravelExpenseGuid ? `/v1/projecttravelexpenses/${input.projectTravelExpenseGuid}/files` : '/v1/projecttravelexpensefiles';
    case 'file':
      return `/v1/files/${input.fileGuid}`;
    case 'filedata':
      return `/v1/files/${input.fileGuid}/filedata`;
    case 'invoice_pdf':
      return `/v1/invoices/${input.invoiceGuid}/pdf`;
    case 'travel_reimbursement_pdf':
      return `/v1/travelreimbursements/${input.travelReimbursementGuid}/pdf`;
    default:
      return input.projectGuid ? `/v1/projects/${input.projectGuid}/files` : '/v1/projectfiles';
  }
}

function organizationPath(resource: string): string {
  const paths: Record<string, string> = {
    details: '/v1/organizationdetails',
    settings: '/v1/organizationsettings',
    visma_financials_company: '/v1/integrations/vismafinancials/companyinformation',
  };
  return paths[resource] ?? '/v1/organizationdetails';
}

function auditTarget(input: unknown): unknown {
  if (!input || typeof input !== 'object') {
    return input;
  }
  const value = input as Record<string, unknown>;
  return {
    method: value.method,
    path: value.path,
    query: value.query,
    customerGuid: value.customerGuid,
    projectGuid: value.projectGuid,
    invoiceGuid: value.invoiceGuid,
    userGuid: value.userGuid,
    collection: value.collection,
    pageToken: value.pageToken,
    rowCount: value.rowCount,
    changedSince: value.changedSince,
    reason: value.reason,
    operationHash: value.operationHash,
    confirmOperationHash: value.confirmOperationHash,
  };
}

function jsonToolResult(data: unknown) {
  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}
