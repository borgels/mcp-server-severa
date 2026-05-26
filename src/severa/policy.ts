import { readFile } from 'node:fs/promises';
import type { PreparedSeveraRequest } from './requests.js';

export interface SeveraPolicy {
  writesEnabled?: boolean;
  allowedOperations?: string[];
  allowedScopes?: string[];
  allowedMethods?: string[];
  deniedOperationPatterns?: string[];
  allowDeletes?: boolean;
  maxBodyBytes?: number;
}

export interface SeveraPolicyDecision {
  allowed: boolean;
  reason: string;
}

const ALLOWED_READ_TOOLS = new Set([
  'severa_search_capabilities',
  'severa_get_capability',
  'severa_get_schema',
  'severa_check_connection',
  'severa_auth_context',
  'severa_search_customers',
  'severa_get_customer',
  'severa_search_contacts',
  'severa_search_projects',
  'severa_get_project',
  'severa_project_overview',
  'severa_search_invoices',
  'severa_search_workhours',
  'severa_search_time_entries',
  'severa_search_fees',
  'severa_search_travel_expenses',
  'severa_search_resource_allocations',
  'severa_search_users',
  'severa_search_activities',
  'severa_search_files',
  'severa_search_settings',
  'severa_get_organization',
  'severa_rest_read',
  'severa_prepare_request',
]);

export function checkToolPolicy(toolName: string): SeveraPolicyDecision {
  if (ALLOWED_READ_TOOLS.has(toolName)) {
    return { allowed: true, reason: 'read-only or dry-run Severa tool' };
  }

  if (toolName === 'severa_commit_prepared_request') {
    return checkWritesEnabled();
  }

  return { allowed: false, reason: `tool is not allowlisted: ${toolName}` };
}

export async function checkRequestPolicy(prepared: PreparedSeveraRequest): Promise<SeveraPolicyDecision> {
  const writesDecision = checkWritesEnabled();
  if (!writesDecision.allowed) {
    return writesDecision;
  }

  const policy = await readPolicy();
  if (policy.writesEnabled === false) {
    return { allowed: false, reason: 'policy file disables writes' };
  }

  if (prepared.method === 'DELETE' && policy.allowDeletes !== true) {
    return { allowed: false, reason: 'DELETE operations require allowDeletes=true in the Severa policy file' };
  }

  const bodyBytes = prepared.body === undefined ? 0 : Buffer.byteLength(JSON.stringify(prepared.body), 'utf8');
  if (policy.maxBodyBytes !== undefined && bodyBytes > policy.maxBodyBytes) {
    return { allowed: false, reason: `request body exceeds policy maxBodyBytes=${policy.maxBodyBytes}` };
  }

  for (const pattern of policy.deniedOperationPatterns ?? []) {
    if (new RegExp(pattern).test(prepared.operation) || new RegExp(pattern).test(prepared.operationId)) {
      return { allowed: false, reason: `operation denied by policy pattern: ${pattern}` };
    }
  }

  if (policy.allowedMethods?.length && !policy.allowedMethods.includes(prepared.method)) {
    return { allowed: false, reason: `method not allowlisted: ${prepared.method}` };
  }

  if (policy.allowedScopes?.length) {
    const allowedScopes = new Set(policy.allowedScopes);
    const deniedScope = prepared.scopes.find(scope => !allowedScopes.has(scope));
    if (deniedScope) {
      return { allowed: false, reason: `scope not allowlisted: ${deniedScope}` };
    }
  }

  if (policy.allowedOperations?.length && !policy.allowedOperations.includes(prepared.operation) && !policy.allowedOperations.includes(prepared.operationId)) {
    return { allowed: false, reason: `operation not allowlisted: ${prepared.operation}` };
  }

  return { allowed: true, reason: 'request allowed by Severa write policy' };
}

async function readPolicy(): Promise<SeveraPolicy> {
  const policyPath = process.env.SEVERA_POLICY_PATH;
  if (!policyPath) {
    return {};
  }

  const text = await readFile(policyPath, 'utf8');
  return JSON.parse(text) as SeveraPolicy;
}

function checkWritesEnabled(): SeveraPolicyDecision {
  if (process.env.SEVERA_ENABLE_WRITES !== 'true') {
    return {
      allowed: false,
      reason: 'writes are disabled. Set SEVERA_ENABLE_WRITES=true to permit commit tools.',
    };
  }

  return { allowed: true, reason: 'writes enabled by environment' };
}
