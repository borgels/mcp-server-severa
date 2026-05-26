import { describe, expect, it } from 'vitest';
import { getSchema, searchCapabilities } from '../src/severa/capabilities.js';
import { SEVERA_OPERATIONS, SEVERA_SCHEMAS } from '../src/severa/openapi-catalog.js';

describe('Severa OpenAPI catalog', () => {
  it('indexes the documented v1.0 operation and schema surface', () => {
    expect(SEVERA_OPERATIONS.length).toBeGreaterThanOrEqual(500);
    expect(Object.keys(SEVERA_SCHEMAS).length).toBeGreaterThanOrEqual(300);
    expect(SEVERA_OPERATIONS).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: 'Customers_GetCustomers', method: 'GET', path: '/v1/customers', risk: 'read' }),
      expect.objectContaining({ id: 'Customers_PostCustomer', method: 'POST', path: '/v1/customers', risk: 'write' }),
      expect.objectContaining({ id: 'Customers_DeleteCustomer', method: 'DELETE', path: '/v1/customers/{guid}', risk: 'destructive' }),
    ]));
  });

  it('searches curated tools, generated operations, and schemas', () => {
    expect(searchCapabilities('resource allocations', 5).some(item => item.id === 'severa_search_resource_allocations')).toBe(true);
    expect(searchCapabilities('Customers_PostCustomer', 5).some(item => item.id === 'severa_operation_Customers_PostCustomer')).toBe(true);
    expect(getSchema('CustomerModel')).toBeTruthy();
  });
});
