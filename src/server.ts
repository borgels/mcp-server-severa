import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SeveraClient, type SeveraClientOptions } from './severa/client.js';
import { registerSeveraTools } from './tools/severa.js';

export interface CreateServerOptions {
  client?: SeveraClient;
  clientOptions?: SeveraClientOptions;
}

const PACKAGE_VERSION = readPackageVersion();

export function createServer(options: CreateServerOptions = {}): McpServer {
  const server = new McpServer({
    name: 'severa',
    version: PACKAGE_VERSION,
  });

  const client = options.client ?? new SeveraClient(options.clientOptions);
  registerSeveraTools(server, client);

  return server;
}

function readPackageVersion(): string {
  let dir = dirname(fileURLToPath(import.meta.url));
  for (let i = 0; i < 10; i += 1) {
    try {
      const raw = readFileSync(resolve(dir, 'package.json'), 'utf8');
      const parsed = JSON.parse(raw) as { version?: unknown };
      if (typeof parsed.version === 'string' && parsed.version.length > 0) {
        return parsed.version;
      }
    } catch {
      // Walk up until package.json is reachable in source and bundled modes.
    }
    const parent = dirname(dir);
    if (parent === dir) {
      break;
    }
    dir = parent;
  }
  return '0.0.0';
}
