import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { checkRequestPolicy, checkToolPolicy } from '../src/severa/policy.js';
import { prepareSeveraRequest } from '../src/severa/requests.js';

const originalEnv = { ...process.env };
let tempDir: string;

describe('Severa policy', () => {
  beforeEach(async () => {
    process.env = { ...originalEnv };
    tempDir = await mkdtemp(join(tmpdir(), 'severa-policy-'));
  });

  afterEach(async () => {
    process.env = { ...originalEnv };
    await rm(tempDir, { recursive: true, force: true });
  });

  it('allows read and dry-run tools without write opt-in', () => {
    expect(checkToolPolicy('severa_search_projects')).toMatchObject({ allowed: true });
    expect(checkToolPolicy('severa_prepare_request')).toMatchObject({ allowed: true });
  });

  it('blocks commit tools unless writes are enabled', () => {
    expect(checkToolPolicy('severa_commit_prepared_request')).toMatchObject({ allowed: false });
    process.env.SEVERA_ENABLE_WRITES = 'true';
    expect(checkToolPolicy('severa_commit_prepared_request')).toMatchObject({ allowed: true });
  });

  it('allows write requests when env and operation policy permit them', async () => {
    process.env.SEVERA_ENABLE_WRITES = 'true';
    const policyPath = join(tempDir, 'policy.json');
    process.env.SEVERA_POLICY_PATH = policyPath;
    await writeFile(policyPath, JSON.stringify({
      writesEnabled: true,
      allowedOperations: ['Customers_PatchCustomer'],
      allowedScopes: ['customers:write'],
      allowedMethods: ['PATCH'],
      maxBodyBytes: 1000,
    }));

    const prepared = prepareSeveraRequest({
      method: 'PATCH',
      path: '/v1/customers/00000000-0000-0000-0000-000000000000',
      body: { name: 'Acme' },
      reason: 'Correct customer name',
    });

    expect(await checkRequestPolicy(prepared)).toMatchObject({ allowed: true });
  });

  it('requires explicit delete policy', async () => {
    process.env.SEVERA_ENABLE_WRITES = 'true';
    const prepared = prepareSeveraRequest({
      method: 'DELETE',
      path: '/v1/customers/00000000-0000-0000-0000-000000000000',
      reason: 'Remove duplicate customer',
    });

    expect(await checkRequestPolicy(prepared)).toMatchObject({ allowed: false });
  });
});
