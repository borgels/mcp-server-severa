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

- The MCP server reads credentials from environment variables only; an
  embedded gateway takes them only from its options (see
  [Embedding](#embedding-gateway)).
- `SEVERA_BASE_URL` must be `https://`; loopback `http://` is allowed for local
  mocks.
- Errors are our own texts with the HTTP status; Severa's response bodies,
  messages and request ids are never read into an error. Formatted errors also
  redact Authorization, client secrets, access tokens, refresh tokens, and
  token-like material.
- A successful answer that is not JSON (`application/json` or a `+json` type)
  is refused with a fixed text instead of being passed on as text.
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

## Embedding (`./gateway`)

`mcp-server-severa/gateway` lets a host application run the tools in-process
instead of over MCP, in the same shape as `mcp-server-template`. One process
can run several gateway instances, for example one per tenant.

```ts
import { createSeveraGateway, severaToolCatalog } from 'mcp-server-severa/gateway';

const gateway = createSeveraGateway({
  clientId: tenant.severaClientId,
  clientSecret: tenant.severaClientSecret,
  policy: { audit: record => log(record) },
});
const result = await gateway.callTool('search_customers', { isActive: true }, { caller: 'user-1', requestId: 'r-1' });
```

The module exports:

- `createSeveraGateway({ clientId, clientSecret, baseUrl?, fetchImpl?, timeoutMs?, policy? })`.
  `clientId` and `clientSecret` are the customer's Severa API client
  credentials. Both are required and never read from the environment. The
  instance asks Severa for its own access token
  (`POST /v1/login/oauth/token`, client credentials) with the fixed read-only
  scope `SEVERA_READ_SCOPE`, caches it per instance (never shared with
  another instance) and asks for a new one when it runs out or Severa rejects
  it. `baseUrl` defaults to `https://api.severa.visma.com/rest-api`;
  `timeoutMs` defaults to 30 seconds. The gateway reads no `SEVERA_*`
  variable at all: not `SEVERA_CLIENT_ID`, `SEVERA_CLIENT_SECRET`,
  `SEVERA_ACCESS_TOKEN`, `SEVERA_SCOPE`, `SEVERA_BASE_URL` or
  `SEVERA_TIMEOUT_MS`, and none of the policy and audit variables. It has no
  access-token or scope option (the stdio and HTTP transports keep them).
- `gateway.tools` (the tools enabled on the instance) and
  `gateway.callTool(name, input, { caller, requestId })`. Names are accepted
  with or without the `severa_` prefix. Input is validated with the tool's zod
  schema before anything is sent, and unknown fields are refused. The audit
  records of the call hold `caller` only as an HMAC pseudonym (a per-process
  key) and a request id of the server's own, the same for every record of the
  call; the host's `requestId` is not written. An error is recorded as a fixed
  code (`http_<status>`, `timeout` or `error`), never as its message.
- `severaGatewayTools`: the definitions (`name` without prefix, `title`,
  `description`, `riskLevel`, `enabledByDefault`, `inputSchema` as JSON
  Schema derived from the zod schema the call is validated with).
- `severaToolCatalog`: the same tools, deeply frozen, with `upstream` (method
  and path template of every Severa request the tool may make, the token
  request included) and `broad` (true when the input chooses what is read).
  Hosts can build their own permission model from it without creating an
  instance.
- `SEVERA_READ_SCOPE`, `GatewayConfigError` and the types
  (`SeveraGatewayOptions`, `SeveraGateway`, `InstancePolicy`, `AuditSink`,
  `GatewayToolDefinition`, `GatewayToolCatalogEntry`,
  `GatewayUpstreamOperation`, `GatewayToolResult`, `GatewayCallContext` and the
  JSON types).

| Tool | Risk | Broad | Severa requests (besides `POST /v1/login/oauth/token`) |
|---|---|---|---|
| `search_capabilities` | read | no | none (no token either) |
| `check_connection` | read | no | `GET /heartbeat/authorized` |
| `get_schema` | read | no | none (no token either) |
| `search_customers` | read | no | `GET /v1/customers` |
| `get_customer` | read | no | `GET /v1/customers/{guid}` |
| `search_projects` | read | no | `GET /v1/projects`, `GET /v1/salescases` |
| `get_project` | read | no | `GET /v1/projects/{guid}` |
| `rest_read` | read | **yes** | every read operation of the OpenAPI catalog, chosen by `method` and `path` |

`rest_read` reads anything the client may read, so it is the one broad tool:
a host that grants tools per role should give it only to roles that may read
everything. The prepare/commit write tools stay in the MCP server only.

**Instance policy.** With `policy: { enableWrites, disabledTools, audit }`
the host decides the instance's policy: the instance leaves the disabled
tools out of `tools` (and out of `search_capabilities`), refuses them when
called, and sends its audit records to `audit` (none without it).
`disabledTools` must name gateway tools. A sink that throws on a start record
refuses the call. Without `policy` the instance uses the default policy (no
writes, no disabled tools, no audit records); it never reads
`SEVERA_ENABLE_WRITES`, `SEVERA_POLICY_PATH` or `SEVERA_AUDIT_LOG`. Every call
runs in a call scope of its own (AsyncLocalStorage), so a call made from
inside another instance's call never inherits its policy, sink, redactor or
caller. There is no process-wide registry of secrets.

**Results.** A successful result has `structuredContent` and one text block:
a short summary, a blank line, and the same data as compact JSON. The data
is redacted twice against the instance's secrets (the client id, the client
secret and every access token Severa issued to the instance: exact values,
URL- and JSON-encoded forms and any piece of 6 characters or more, in
strings, object keys and the string form of numbers and booleans) before it
is serialised. A failure reported inside a successful answer is reduced to
its HTTP status and our own text.

**Errors.** The text of an error result is our own English, never Severa's
response body, message or request id, nor a redirect's `Location` or the
configured address. An HTTP failure starts with
`Severa API request failed with HTTP <status>`, followed by our own hint and
the parsed `retry-after` where there is one, so a host can map it by status;
a failed token request has a hint of its own (for 400, 401 and 403:
`Severa refused the client credentials …`). Other errors start with
`Invalid input for <tool>:`, `Unsupported Severa gateway tool.`,
`Severa API responded with a redirect (HTTP <status>)`,
`Network error calling the Severa API`, `Severa API request timed out after`,
`The Severa token answer held …`, or the policy refusal.

**Failure metadata.** When Severa answered with an HTTP error (a failed token
request and a refused redirect included), the error result also has
`failure: { httpStatus, requestId? }`: the status, and Severa's request id
from a response header (`REQUEST_ID_HEADERS` in `src/errors.ts`) only when it
is a hex id of 8 to 64 characters (one run of hex digits, or groups of four or
more joined by single hyphens, as in a UUID) and does not hold the shape of a
personal number. It is checked again after redaction. A host can count
failures from it without reading their text. Never the response body,
Severa's error code or message.

**Credential admission and the sink check.** A gateway accepts only a client
id and a client secret of printable ASCII (0x21-0x7E) of at least 16
characters each that share no piece of 6 characters with a string literal in
`src/` (`src/fixed-corpus.generated.ts`, kept up to date by a test), with the
fixed fallbacks (`src/fallbacks.ts`) or with the tool list. A refused
credential throws `GatewayConfigError` when the gateway is created, before
anything is built or sent; the refusal is a fixed text that holds no piece of
either credential, and every error a gateway throws has no `cause` and a
`stack` of only `name: message`. As the very last step, every output (the
tool list, each result as a whole, each audit record) is checked in its final
form, and one that still holds a piece of a credential or of an issued token
is replaced by a fixed fallback. Residual risk: Severa echoing a secret back
otherwise transformed (split into pieces shorter than 6 characters, reversed,
hashed) is not recognised; such data reaches only the tenant whose secret it
is. Severa chooses the access token, so it is checked when it arrives: a
token (access or refresh) shorter than 16 characters, not printable ASCII, or
sharing a piece with a fixed fallback is refused (`The Severa token answer
held a token this server cannot use.`) and never used. It is not checked
against all of our texts: a piece of it that happens to match one of them
makes that text redacted or withheld in later outputs.

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

## License

The code is source-available under the [Functional Source License, Version 1.1, ALv2 Future License](LICENSE) (FSL-1.1-ALv2).

In plain words:

- **Allowed:** reading the code, running it, changing it, using it inside your own organisation (also commercially), using it for non-commercial education and research, and contributing changes back.
- **Not allowed:** making it, or something built from it, available to others as a commercial product or service that competes with it, for example a hosted service with the same functionality.
- **Becomes Apache-2.0:** each version is also licensed under the Apache License 2.0 from two years after it is released.
- **Earlier versions:** versions released before 0.5.0 were licensed under Apache-2.0 and remain so.

The terms in [LICENSE](LICENSE) are what apply; this summary does not replace them. See also [NOTICE](NOTICE).
