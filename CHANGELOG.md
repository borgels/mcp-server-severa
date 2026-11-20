# Changelog

## 0.3.0 (2026-11-20)

The gateway entry point (`./gateway`) in the shape of `mcp-server-template`
(as `mcp-server-pleo` 0.3.0), for hosts that run one instance per tenant in a
shared process.

### Changes

- `createSeveraGateway({ clientId, clientSecret, baseUrl?, fetchImpl?, timeoutMs?, policy? })`:
  both client credentials are required and never read from the environment.
  The OAuth scope is the fixed read-only list `SEVERA_READ_SCOPE`; `baseUrl`
  defaults to `https://api.severa.visma.com/rest-api`; `timeoutMs` defaults
  to 30 seconds. The gateway reads no `SEVERA_*` variable at all. The
  `accessToken` and `scope` options are gone from the gateway (the stdio and
  HTTP transports keep them).
- Each instance fetches and caches its own access token; the token request
  (`POST /v1/login/oauth/token`) is an upstream request in the catalog. The
  issued access token (and a refresh token, if any) is a secret of the
  instance from then on, redacted like the client id and secret. A token
  Severa rejects (401) is dropped, and the next call asks for a new one;
  concurrent calls share one token request.
- Credential admission: printable ASCII, at least 16 characters, no piece of
  6 characters shared with the server's own texts, its fixed fallbacks or the
  tool list, for the client id and the client secret alike. A refused
  credential throws `GatewayConfigError` at construction with a fixed text
  that holds no piece of either; construction errors are sealed (no `cause`,
  no stack frames).
- Host policy `{ enableWrites, disabledTools, audit }` per instance; without
  it the default policy (no writes, nothing disabled, no audit). Every call
  runs in its own call scope with the caller and request id from the call
  context.
- `severaToolCatalog`: a deeply frozen catalog with `inputSchema` derived from
  the zod schema the call is validated with (strict: unknown fields are
  refused), `upstream` (method and path template of every Severa request,
  the token request included) and `broad`. The tool set is unchanged:
  `search_capabilities`, `check_connection`, `get_schema`,
  `search_customers`, `get_customer`, `search_projects`, `get_project`,
  `rest_read`, all `read`; `rest_read` is the one broad tool.
- Handlers, schemas, policy and audit are shared with the MCP server; the
  gateway no longer has its own switch over tool names.
- Results: data redacted twice against the instance's secrets, credentials
  the upstream echoes masked (Authorization headers, Bearer and Basic values,
  JSON Web Tokens, credential assignments in text and credential-named
  fields), then checked at the sink (a result still holding a piece of a
  secret is withheld); the text block holds a short summary followed by the
  data as compact JSON, equal to `structuredContent`.
- Errors are our own texts: an HTTP failure reads
  `Severa API request failed with HTTP <status>` with our hint and the parsed
  `retry-after`, never Severa's response body, message, request id or the
  request URL (also in the MCP server, whose error bodies are no longer
  read). A failed token request has its own hint. Redirects, network failures
  and timeouts are worded by us and quote neither the address nor the cause.
  Failures nested in a successful answer are reduced to the status and our
  own text.
- A successful answer that is not JSON, or JSON that does not parse, is
  refused with a fixed text instead of being passed on as text (also in the
  MCP server).
- The audit never holds the host's text: an unknown tool is recorded as
  `unknown_tool`, the caller only as an HMAC pseudonym with a per-process key,
  the request id is the server's own, and an error is a fixed code
  (`http_<status>`, `timeout` or `error`), never its message.
- `search_capabilities` in a gateway lists only what the instance offers.

### Upgrade notes

- `createSeveraGateway()` without `clientId` and `clientSecret` now throws;
  pass them explicitly. `SEVERA_CLIENT_ID`, `SEVERA_CLIENT_SECRET`,
  `SEVERA_ACCESS_TOKEN`, `SEVERA_SCOPE`, `SEVERA_BASE_URL`, `SEVERA_TIMEOUT_MS`,
  `SEVERA_ENABLE_WRITES`, `SEVERA_POLICY_PATH` and `SEVERA_AUDIT_LOG` are
  ignored by the gateway.
- Input schemas are the MCP server's: GUIDs are checked, enums enforced, and
  unknown fields are refused instead of ignored.
- Error texts no longer include Severa's error message, the request URL or
  the request id.

## 0.2.0

### Changes

- HTTP: the server refuses to start without `MCP_HTTP_TOKEN` when bound to a
  non-loopback address or with `MCP_ALLOW_ANY_ORIGIN=true`.
  `MCP_HTTP_ALLOW_UNAUTHENTICATED=true` is an explicit escape hatch.
- HTTP: `MCP_HTTP_TOKEN` must be at least 32 printable ASCII characters.
- HTTP: failed authentications are limited per client address (429 with
  `Retry-After`); valid tokens are never throttled. New `MCP_AUTH_FAILURE_LIMIT`
  (default 20, `0` disables) and `MCP_AUTH_FAILURE_WINDOW_MS` (default 60000).
- HTTP: `Host` header check for loopback binds (`MCP_ALLOWED_HOSTS`).
- HTTP: 401 responses carry `WWW-Authenticate: Bearer`; invalid JSON returns 400
  (JSON-RPC parse error) instead of 500; oversized bodies are refused from
  `Content-Length` before reading; one log line per rejected request.
- HTTP: `GET /healthz`; graceful shutdown on SIGTERM/SIGINT.
- `PORT`, `MCP_MAX_BODY_BYTES`, `SEVERA_TIMEOUT_MS` and the boolean `MCP_*`
  flags are validated at startup; invalid values stop the server instead of
  becoming `NaN`.
- Severa client: redirects are never followed (`redirect: 'manual'`), so the
  bearer token and the OAuth `client_secret` are never re-sent to a redirect
  target; error bodies are read up to 64 KB.
- Dependency updates (`@modelcontextprotocol/sdk` 1.32.2, `zod` 4.6.7, patched
  transitive dependencies); CI uses pinned actions and fails on high/critical
  production advisories.
- Prepared write requests are HMAC-signed (`SEVERA_PREPARE_SECRET`, random per
  process when unset) and verified at commit; GUID path parameters are validated
  and encoded; unsafe raw request paths are rejected.

### Upgrade notes

- A non-loopback bind (`HOST`/`MCP_HTTP_HOST=0.0.0.0`) or
  `MCP_ALLOW_ANY_ORIGIN=true` now requires `MCP_HTTP_TOKEN` of at least 32
  characters (e.g. `openssl rand -hex 32`). A shorter token stops the server.
- Invalid values for the variables above now stop the server at startup.
- Existing variable names are unchanged.

## 0.1.0

- Initial Severa MCP server.
- Added stdio and Streamable HTTP transports.
- Added OpenAPI v1.0 catalog with 534 operations and 384 compact schemas.
- Added curated read tools for customers, projects, invoices, hours, fees,
  travels, resource allocations, users, activities, files, organization data,
  and settings/reference data.
- Added guarded long-tail REST reads and policy-gated prepare/commit writes.
- Added environment-only credentials, safe base URL checks, redacted errors, and
  optional hashed audit logging.
