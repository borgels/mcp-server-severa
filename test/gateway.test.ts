import { describe, expect, it } from 'vitest';
import { createSeveraGateway, severaGatewayTools } from '../src/gateway.js';

describe('Severa gateway export', () => {
  it('exposes a curated read-first Severa surface', () => {
    expect(severaGatewayTools.map(tool => tool.name)).toEqual(expect.arrayContaining([
      'check_connection',
      'search_customers',
      'search_projects',
      'rest_read',
    ]));
    expect(severaGatewayTools.every(tool => tool.riskLevel === 'read')).toBe(true);
  });

  it('passes bearer credentials to Severa requests', async () => {
    const requests: Request[] = [];
    const gateway = createSeveraGateway({
      accessToken: 'severa-token',
      baseUrl: 'https://example.test',
      fetchImpl: async (input, init) => {
        requests.push(new Request(input, init));
        return new Response(null, { status: 204 });
      },
    });

    await gateway.callTool('check_connection');
    expect(requests[0]?.headers.get('Authorization')).toBe('Bearer severa-token');
  });
});
