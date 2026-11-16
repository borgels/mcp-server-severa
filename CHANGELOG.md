# Changelog

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
