# mcp-server-severa

TypeScript MCP server for the Visma Severa REST API. It is intentionally boring
good: typed, documented, read-first, policy-aware, credential-sane, and
audit-friendly.

This is an independent, unofficial project. It is not developed, endorsed or supported by Visma or Visma Severa.

> "Visma" and "Severa" are referenced only to describe what this server talks
> to. You need your own Severa REST API credentials, and use of the API is
> subject to Visma's own terms.

## Scope

The server exposes Severa through three layers:

- Curated MCP tools for customers, projects, invoices, hours, fees, travel,
  resource allocations, users, activities, files, organization data, and
  settings/reference data.
- Discovery tools backed by Severa OpenAPI v1.0, currently indexing 534
  operations and 384 schemas.
- A guarded REST read tool and a dry-run + commit flow for governed writes.

Default install mode is read-first. Write commits require explicit environment
opt-in, a prepared request hash, a business reason, an idempotency key for the
audit trail, and optional policy-file approval. DELETE operations additionally
require `allowDeletes=true` in the policy file.

## Setup

Install dependencies and build the CLI:

```sh
npm install
npm run build
```

Create Severa REST API credentials in Severa UI REST API settings, then set
them in the MCP server environment. The server never accepts credentials as tool
arguments.

```sh
export SEVERA_CLIENT_ID="your-client-id"
export SEVERA_CLIENT_SECRET="your-client-secret"
export SEVERA_SCOPE="customers:read projects:read invoices:read hours:read settings:read"
```

Optional settings:

```sh
export SEVERA_BASE_URL="https://api.severa.visma.com/rest-api"
export SEVERA_TIMEOUT_MS=30000
export SEVERA_AUDIT_LOG="/absolute/path/to/severa-audit.jsonl"
```

If another process manages OAuth tokens, you can provide a bearer token directly:

```sh
export SEVERA_ACCESS_TOKEN="your-access-token"
```

## Claude Or Cursor Config

Use the stdio server for local MCP clients:

```json
{
  "mcpServers": {
    "severa": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-server-severa/dist/transports/stdio.js"],
      "env": {
        "SEVERA_CLIENT_ID": "your-client-id",
        "SEVERA_CLIENT_SECRET": "your-client-secret",
        "SEVERA_SCOPE": "customers:read projects:read invoices:read hours:read settings:read"
      }
    }
  }
}
```

During development:

```json
{
  "mcpServers": {
    "severa": {
      "command": "npm",
      "args": ["run", "dev", "--prefix", "/absolute/path/to/mcp-server-severa"],
      "env": {
        "SEVERA_CLIENT_ID": "your-client-id",
        "SEVERA_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

## Start Here

Ask the MCP client to call:

- `severa_search_capabilities` to find tools, OpenAPI operations, scopes, and
  schemas.
- `severa_check_connection` to verify credentials.
- `severa_auth_context` to see auth method and token metadata.
- `severa_get_schema` to inspect a request/response model before preparing a
  write.

## Main Tools

Discovery:

- `severa_search_capabilities`
- `severa_get_capability`
- `severa_get_schema`
- `severa_check_connection`
- `severa_auth_context`

Curated reads:

- `severa_search_customers`, `severa_get_customer`, `severa_search_contacts`
- `severa_search_projects`, `severa_get_project`, `severa_project_overview`
- `severa_search_invoices`
- `severa_search_workhours`, `severa_search_time_entries`
- `severa_search_fees`, `severa_search_travel_expenses`
- `severa_search_resource_allocations`
- `severa_search_users`, `severa_search_activities`
- `severa_search_files`
- `severa_search_settings`
- `severa_get_organization`

Long-tail coverage:

- `severa_rest_read`

Governed writes:

- `severa_prepare_request`
- `severa_commit_prepared_request`

`severa_rest_read` is not arbitrary HTTP. It only calls read operations from the
generated Severa OpenAPI catalog. Documented read-style `POST` endpoints, such
as resource allocation criteria search, are allowed; normal writes are rejected.

## Live Smoke Tests

The normal test suite uses mocks and catalog checks. With real Severa
credentials in environment variables, you can run live read-only smoke tests:

```sh
npm run smoke:live
npm run smoke:live:broad
```

`smoke:live:broad` uses an in-memory MCP client/server transport, calls the
registered tools across the main Severa domains, and only exercises write
support through dry-run preparation and disabled-commit rejection. It does not
enable writes, does not call live commit operations, and prints shape summaries
instead of raw business records.

## Write Policy

Writes are blocked unless explicitly enabled:

```sh
export SEVERA_ENABLE_WRITES=true
export SEVERA_POLICY_PATH="/absolute/path/to/severa-policy.json"
export SEVERA_AUDIT_LOG="/absolute/path/to/severa-audit.jsonl"
```

Example policy:

```json
{
  "writesEnabled": true,
  "allowedOperations": ["Customers_PostCustomer", "PATCH /v1/customers/{guid}"],
  "allowedMethods": ["POST", "PATCH"],
  "deniedOperationPatterns": ["DELETE", "settings"],
  "allowDeletes": false,
  "maxBodyBytes": 20000
}
```

Write flow:

1. Call `severa_prepare_request` with method, path, query, body, and business
   reason.
2. Inspect the returned `preparedRequest`, `operation`, `operationId`, and
   `operationHash`.
3. Call `severa_commit_prepared_request` with the full prepared request, matching
   `confirmOperationHash`, and an `idempotencyKey`.

Prepared requests are signed with HMAC-SHA256 and expire after 15 minutes. At
commit the server verifies the signature, re-derives the operation,
operationId, scopes, and risk from the OpenAPI catalog using the method and
path, and applies the policy file to those derived values. Set
`SEVERA_PREPARE_SECRET` to share the signing key across server instances or
restarts; when unset, a random per-process key is used.

The idempotency key is stored only as a hash in the audit log. Severa's public
REST documentation does not define a generic idempotency header, so the key is
used for local governance rather than sent upstream.

## Security And Audit

- Credentials are read from environment variables only.
- `SEVERA_BASE_URL` must be `https://`; loopback `http://` is allowed for local
  mocks.
- Formatted errors redact Authorization, client secrets, access tokens, refresh
  tokens, and token-like material.
- Optional JSONL audit logging stores hashed targets and hashed idempotency
  keys, not raw request bodies.
- The Streamable HTTP transport binds to `127.0.0.1` by default.
- The HTTP transport requires `MCP_HTTP_TOKEN` (bearer auth, compared in
  constant time) for any non-loopback bind; see [HTTP Transport](#http-transport).
- GUID inputs are validated and URL-encoded before they are placed in request
  paths; raw request paths with query/fragment delimiters, percent-encoding,
  backslashes, or dot segments are rejected.
- Set `MCP_ALLOWED_ORIGINS` for browser-based local clients. Without it,
  loopback origins are allowed and other origins are rejected.
- `MCP_MAX_BODY_BYTES` defaults to `10485760` (10 MiB).

Security reports: security@borgels.com.

## HTTP Transport

The default transport is stdio. A Streamable HTTP endpoint (`POST /mcp`) is
available via `npm run dev:http` or `node dist/http.js`.

| Variable | Default | Meaning |
|---|---|---|
| `MCP_HTTP_HOST` / `HOST` | `127.0.0.1` | Bind address. |
| `PORT` | `3000` | Listen port (1-65535). |
| `MCP_HTTP_TOKEN` | - | Bearer token required on `/mcp`; at least 32 printable ASCII characters (e.g. `openssl rand -hex 32`). Required for a non-loopback bind or `MCP_ALLOW_ANY_ORIGIN=true`. |
| `MCP_HTTP_ALLOW_UNAUTHENTICATED` | `false` | Serve `/mcp` without a token on a non-loopback bind or with `MCP_ALLOW_ANY_ORIGIN` (logs a warning). Only when access is restricted by other means. |
| `MCP_MAX_BODY_BYTES` | `10485760` | Largest accepted request body; larger bodies get 413. |
| `MCP_ALLOWED_ORIGINS` | localhost origins | Comma-separated exact `Origin` values allowed. |
| `MCP_ALLOW_ANY_ORIGIN` | `false` | Allow any `Origin`; requires `MCP_HTTP_TOKEN`. |
| `MCP_ALLOWED_HOSTS` | see below | Comma-separated host names accepted in the `Host` header. |
| `MCP_AUTH_FAILURE_LIMIT` | `20` | Failed authentications per client address and window before further failures get 429; `0` disables. |
| `MCP_AUTH_FAILURE_WINDOW_MS` | `60000` | Window for the limit above. |
| `SEVERA_TIMEOUT_MS` | `30000` | Upstream request timeout (1-600000 ms). |

The server refuses to start when it would expose `/mcp` without a token: a
non-loopback bind or `MCP_ALLOW_ANY_ORIGIN=true` without `MCP_HTTP_TOKEN`
(unless `MCP_HTTP_ALLOW_UNAUTHENTICATED=true`). Invalid numbers or booleans in
these variables also stop it at startup instead of being ignored. On a loopback
bind, only `localhost`, `127.0.0.1`, `[::1]` or the bind address are accepted
in the `Host` header (DNS-rebinding protection); set `MCP_ALLOWED_HOSTS` to
change this. `GET /healthz` answers without authentication.

## Security model

- This server uses one shared upstream identity: every caller acts with the
  Severa client credentials or access token configured in the environment. It
  does not authenticate or distinguish end users itself.
- Per-user authentication and authorization belong in an identity-aware gateway
  in front of the HTTP transport, which holds `MCP_HTTP_TOKEN`.
- Tool access is not data access control: anyone who can call the tools can
  reach whatever the configured Severa credentials can reach. Use credentials
  with the narrowest scope that works.
- Upstream requests never follow redirects, so credentials are only sent to the
  configured API origin.
- The HTTP server does not terminate TLS. Put it behind a TLS-terminating proxy
  or keep it on a private network.
