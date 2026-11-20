import { randomUUID } from 'node:crypto';
import { z } from 'zod/v4';
import { formatUnknownError, MAX_REDACT_DEPTH, redactCredentialPatterns } from './errors.js';
import { fixedOutputs, withheldResult } from './fallbacks.js';
import { admitsKey, KEY_REFUSED, leaksSecret, maskedText, sealedError } from './key-admission.js';
import { writeAuditEvent } from './severa/audit.js';
import { SeveraClient, TOKEN_PATH, type SeveraClientOptions } from './severa/client.js';
import { SEVERA_DEFAULT_BASE_URL, SEVERA_OPERATIONS } from './severa/openapi-catalog.js';
import {
  canonicalToolName,
  GatewayConfigError,
  resolveInstancePolicy,
  runInCallScope,
  TOOL_PREFIX,
  type CallContext,
  type InstancePolicy,
  type ResolvedInstancePolicy,
} from './severa/scope.js';
import { registerSeveraTools } from './tools/severa.js';
import { REDACTION_MARKER, SecretRedactor } from './upstream-http.js';

/**
 * Embeddable entry point (package export `./gateway`): an embedding host,
 * such as an MCP gateway that does its own per-user authorization, lists
 * `tools` and invokes `callTool`. Handlers, input schemas, policy checks and
 * audit are shared with the MCP server in src/tools/severa.ts.
 *
 * Several gateway instances (for example one per tenant) can run in one
 * process. Each instance uses only the client id and secret passed to
 * createSeveraGateway and reads no SEVERA_* variable at all: not the
 * credentials (SEVERA_CLIENT_ID, SEVERA_CLIENT_SECRET, SEVERA_ACCESS_TOKEN),
 * not SEVERA_SCOPE (the scope is the fixed read-only list SEVERA_READ_SCOPE),
 * not SEVERA_BASE_URL (Severa's own address unless `baseUrl` is given), not
 * SEVERA_TIMEOUT_MS (30 seconds unless `timeoutMs` is given), and none of the
 * policy and audit variables. Each instance has its own access token, fetched
 * with its own credentials and cached by its own client, and redacts results,
 * errors and audit records with its own secrets: the client id and secret and
 * every access token Severa issued to it.
 *
 * Instance policy (writes, disabled tools, audit) comes from the host when it
 * passes `policy`; without it the instance uses the default policy (no writes,
 * no disabled tools, no audit records).
 *
 * Every call runs in a call scope of its own (AsyncLocalStorage), so a call
 * made from inside another instance's call (from its audit sink or its fetch)
 * never inherits that instance's policy, sink, redactor or caller.
 */

export type { AuditSink, InstancePolicy } from './severa/scope.js';
export { GatewayConfigError } from './severa/scope.js';

export type GatewayRiskLevel = 'read' | 'write' | 'destructive';
export type GatewayJsonValue =
  | string
  | number
  | boolean
  | null
  | GatewayJsonValue[]
  | { [key: string]: GatewayJsonValue };
export type GatewayJsonObject = { [key: string]: GatewayJsonValue };

export interface GatewayToolDefinition {
  name: string;
  title: string;
  description: string;
  riskLevel: GatewayRiskLevel;
  enabledByDefault: boolean;
  inputSchema: GatewayJsonObject;
}

export interface GatewayToolResult {
  content: Array<{ type: 'text'; text: string }>;
  structuredContent?: GatewayJsonValue;
  isError?: boolean;
}

/** Who and which request a call belongs to; written to the audit records of the call. */
export type GatewayCallContext = CallContext;

/** Deeply read-only JSON, as found in the frozen tool catalog. */
export type GatewayReadonlyJsonValue =
  | string
  | number
  | boolean
  | null
  | readonly GatewayReadonlyJsonValue[]
  | { readonly [key: string]: GatewayReadonlyJsonValue };

/** One Severa API request a tool may make: the method and the path template on the configured base URL. */
export interface GatewayUpstreamOperation {
  readonly method: 'GET' | 'POST';
  readonly path: string;
}

/** A tool catalog entry: the gateway definition plus the upstream requests the tool may make. */
export interface GatewayToolCatalogEntry {
  readonly name: string;
  readonly title: string;
  readonly description: string;
  readonly riskLevel: GatewayRiskLevel;
  readonly enabledByDefault: boolean;
  readonly inputSchema: { readonly [key: string]: GatewayReadonlyJsonValue };
  /**
   * Every Severa request the tool may make, the client-credentials token
   * request (`POST /v1/login/oauth/token`) included. Empty for a tool that
   * does not call Severa.
   */
  readonly upstream: readonly GatewayUpstreamOperation[];
  /**
   * True when the tool can read more than its name says (anything in the
   * system, chosen by the input). A host that grants tools per role gives a
   * broad tool only to roles that may read everything. Only `rest_read` is
   * broad.
   */
  readonly broad: boolean;
}

export interface SeveraGatewayOptions
  extends Omit<
    SeveraClientOptions,
    'clientId' | 'clientSecret' | 'scope' | 'accessToken' | 'baseUrl' | 'credentialEnv' | 'redactor' | 'acceptsIssuedToken'
  > {
  /** The customer's Severa API client id. Required; never read from the environment. */
  clientId: string;
  /** The customer's Severa API client secret. Required; never read from the environment. */
  clientSecret: string;
  /** Severa API base URL. Default https://api.severa.visma.com/rest-api; never read from the environment. */
  baseUrl?: string;
  /**
   * Instance policy from the host. Without it the instance uses the default
   * policy (no writes, no disabled tools, no audit records); it never reads
   * a policy or audit variable from the environment.
   */
  policy?: InstancePolicy;
}

/**
 * The OAuth scope a gateway instance asks Severa for: every read scope the
 * gateway's tools need, and nothing that writes. Fixed in code, never read
 * from SEVERA_SCOPE.
 */
export const SEVERA_READ_SCOPE = [
  'activities:read',
  'customers:read',
  'fees:read',
  'files:read',
  'hours:read',
  'invoices:read',
  'organization:read',
  'projects:read',
  'resourceallocations:read',
  'settings:read',
  'travels:read',
  'users:read',
].join(' ');

/** Time limit per Severa request when the host gives none. */
const DEFAULT_TIMEOUT_MS = 30_000;

const get = (path: string): GatewayUpstreamOperation => ({ method: 'GET', path });
const post = (path: string): GatewayUpstreamOperation => ({ method: 'POST', path });
/** The client-credentials token request: made before the first request of an instance and when its token runs out. */
const token = post(TOKEN_PATH);

/** Every read operation in the Severa OpenAPI catalog: what the guarded REST read can reach. */
const READ_OPERATIONS: readonly GatewayUpstreamOperation[] = SEVERA_OPERATIONS.filter(
  operation => operation.risk === 'read' && (operation.method === 'GET' || operation.method === 'POST'),
).map(operation => ({ method: operation.method as 'GET' | 'POST', path: operation.path }));

/** The gateway's tools: a curated read-only subset of the MCP server's tools, with their own titles. */
const GATEWAY_TOOLS: ReadonlyArray<{
  name: string;
  title: string;
  description: string;
  riskLevel: GatewayRiskLevel;
  /** The first line of a successful result's text. */
  summary: string;
  upstream: readonly GatewayUpstreamOperation[];
  broad?: boolean;
}> = [
  {
    name: 'search_capabilities',
    title: 'Search Severa capabilities',
    description: 'Find the Severa tools, read operations and schemas this connection offers.',
    riskLevel: 'read',
    summary: 'Severa capabilities.',
    upstream: [],
  },
  {
    name: 'check_connection',
    title: 'Check Severa connection',
    description: 'Verify that Severa accepts the configured client credentials.',
    riskLevel: 'read',
    summary: 'Severa connection checked.',
    upstream: [token, get('/heartbeat/authorized')],
  },
  {
    name: 'get_schema',
    title: 'Get Severa schema',
    description: 'Inspect compact Severa OpenAPI schema metadata by name, or search schema names and properties.',
    riskLevel: 'read',
    summary: 'Severa schema.',
    upstream: [],
  },
  {
    name: 'search_customers',
    title: 'Search Severa customers',
    description: 'Search customers by name, number, VAT number, email, owner and active or internal flags.',
    riskLevel: 'read',
    summary: 'Severa customers.',
    upstream: [token, get('/v1/customers')],
  },
  {
    name: 'get_customer',
    title: 'Get Severa customer',
    description: 'Fetch one customer by GUID.',
    riskLevel: 'read',
    summary: 'Severa customer.',
    upstream: [token, get('/v1/customers/{guid}')],
  },
  {
    name: 'search_projects',
    title: 'Search Severa projects',
    description: 'Search projects or sales cases by customer, owner, status, billable state and number.',
    riskLevel: 'read',
    summary: 'Severa projects.',
    upstream: [token, get('/v1/projects'), get('/v1/salescases')],
  },
  {
    name: 'get_project',
    title: 'Get Severa project',
    description: 'Fetch one project by GUID.',
    riskLevel: 'read',
    summary: 'Severa project.',
    upstream: [token, get('/v1/projects/{guid}')],
  },
  {
    name: 'rest_read',
    title: 'Run guarded Severa REST read',
    description:
      'Run any read operation from the Severa OpenAPI catalog, chosen by method and path. Reads anything the client may read.',
    riskLevel: 'read',
    summary: 'Severa data.',
    upstream: [token, ...READ_OPERATIONS],
    broad: true,
  },
];

type RegisteredHandler = (input: Record<string, unknown>) => Promise<unknown>;
interface RegisteredTool {
  inputSchema: z.ZodType;
  handler: RegisteredHandler;
}

/**
 * The MCP server's tools as registered: the zod input schema (strict: an
 * unknown field is refused, not dropped) and the handler bound to `client`.
 */
function registeredTools(client: SeveraClient): Map<string, RegisteredTool> {
  const tools = new Map<string, RegisteredTool>();
  const server = {
    registerTool(name: string, config: { inputSchema?: z.ZodRawShape }, handler: RegisteredHandler): void {
      tools.set(name, { inputSchema: z.strictObject(config.inputSchema ?? {}), handler });
    },
  };
  registerSeveraTools(server as never, client);
  return tools;
}

/**
 * JSON Schema for a gateway tool, derived from the same zod schema the call
 * is validated with. `format` is dropped: validators such as Ajv reject
 * unknown formats in strict mode, and zod checks the values when the call runs.
 */
function toJsonSchema(schema: z.ZodType): GatewayJsonObject {
  const { $schema: _ignored, ...json } = z.toJSONSchema(schema, {
    io: 'input',
    override: ctx => {
      delete (ctx.jsonSchema as Record<string, unknown>).format;
    },
  }) as Record<string, unknown>;
  return json as GatewayJsonObject;
}

function deepFreeze<T>(value: T): T {
  if (typeof value === 'object' && value !== null && !Object.isFrozen(value)) {
    for (const entry of Object.values(value)) {
      deepFreeze(entry);
    }
    Object.freeze(value);
  }
  return value;
}

// Schemas only: registration binds the handlers to a client but never calls it.
const schemas = registeredTools(
  new SeveraClient({ accessToken: 'schema-only', credentialEnv: {}, redactor: new SecretRedactor(), timeoutMs: 1 }),
);

function definition(tool: (typeof GATEWAY_TOOLS)[number]): GatewayToolDefinition {
  const registered = schemas.get(`${TOOL_PREFIX}${tool.name}`);
  if (!registered) {
    throw new Error(`Severa gateway tool is not registered: ${tool.name}`);
  }
  return {
    name: tool.name,
    title: tool.title,
    description: tool.description,
    riskLevel: tool.riskLevel,
    enabledByDefault: tool.riskLevel === 'read',
    inputSchema: toJsonSchema(registered.inputSchema),
  };
}

/** All gateway tools, as definitions (names without the prefix). */
export const severaGatewayTools: GatewayToolDefinition[] = GATEWAY_TOOLS.map(definition);

/**
 * The tool catalog: every gateway tool with its definition, the upstream
 * requests it may make and the broad mark. Generated from the same table as
 * `severaGatewayTools` and deeply frozen. Hosts can use it to build their own
 * permission model without creating a gateway instance.
 */
export const severaToolCatalog: readonly GatewayToolCatalogEntry[] = deepFreeze(
  GATEWAY_TOOLS.map(tool => ({
    ...definition(tool),
    upstream: tool.upstream.map(operation => ({ ...operation })),
    broad: tool.broad === true,
  })),
);

const GATEWAY_TOOL_NAMES: readonly string[] = GATEWAY_TOOLS.map(tool => `${TOOL_PREFIX}${tool.name}`);
const SUMMARIES: ReadonlyMap<string, string> = new Map(
  GATEWAY_TOOLS.map(tool => [`${TOOL_PREFIX}${tool.name}`, tool.summary]),
);

/** KEY_REFUSED with every run that shares a piece with any of the secrets masked, so it holds no piece of one. */
function refusedText(field: string, secrets: readonly unknown[]): string {
  return secrets.reduce<string>((text, secret) => maskedText(text, secret), `${field}: ${KEY_REFUSED}`);
}

interface Credentials {
  clientId: string;
  clientSecret: string;
}

function requiredCredentials(options: SeveraGatewayOptions | undefined, given: readonly unknown[]): Credentials {
  const clientId: unknown = options?.clientId;
  const clientSecret: unknown = options?.clientSecret;
  if (typeof clientId !== 'string' || clientId.trim() === '' || typeof clientSecret !== 'string' || clientSecret.trim() === '') {
    throw new GatewayConfigError(
      'createSeveraGateway requires options.clientId and options.clientSecret. Embedded instances do not read credentials from the environment.',
    );
  }
  // Key admission (src/key-admission.ts), for each credential: printable ASCII of 16 characters or more, sharing no
  // piece with any text of ours. Checked before anything is built from them; the refusal is a fixed text that holds no
  // piece of either.
  if (!admitsKey(clientId.trim())) throw new GatewayConfigError(refusedText('options.clientId', given));
  if (!admitsKey(clientSecret.trim())) throw new GatewayConfigError(refusedText('options.clientSecret', given));
  return { clientId: clientId.trim(), clientSecret: clientSecret.trim() };
}

/** A caller or request id from the host: redacted before it is cut short, so no part of a secret survives. */
function contextValue(value: unknown, redactor: SecretRedactor): string | undefined {
  return typeof value === 'string' && value.trim() !== '' ? redactor.redact(value.trim()).slice(0, 200) : undefined;
}

/**
 * Create one gateway instance. `clientId` and `clientSecret` are required
 * and are the only credentials the instance uses; a missing or refused
 * credential fails here, before anything is built or sent.
 */
export function createSeveraGateway(options: SeveraGatewayOptions) {
  let credentials: Credentials | undefined;
  let guard: SecretRedactor | undefined;
  // What the host gave, admitted or not: every error is masked against it.
  const raw = options as Partial<SeveraGatewayOptions> | undefined;
  const given: unknown[] = [raw?.clientId, raw?.clientSecret];
  const secrets = given.flatMap(value => (typeof value === 'string' ? [value, value.trim()] : []));
  try {
    // Admission first, before a redactor is built from the credentials.
    credentials = requiredCredentials(options, secrets);
    // The client id and secret; the access tokens Severa issues are added by the client as they arrive.
    guard = new SecretRedactor().addSecret(credentials.clientId).addSecret(credentials.clientSecret);
    // The fixed outputs of the sink check (src/fallbacks.ts) must hold no piece of either credential.
    if (leaksSecret(fixedOutputs(), guard)) {
      throw new GatewayConfigError(refusedText('options', secrets));
    }
    const gateway = buildSeveraGateway(options, credentials, guard);
    // The tool list leaves the gateway as it is: a credential that shares a piece with it is refused.
    if (leaksSecret(gateway.tools, guard)) {
      throw new GatewayConfigError(refusedText('options', secrets));
    }
    return gateway;
  } catch (error) {
    let message = error instanceof Error ? error.message : String(error);
    if (guard && credentials !== undefined) {
      // Redacted, then checked whole as the very last step: a message that still holds a piece of a credential
      // becomes the fixed refusal.
      message = guard.redact(message);
      if (leaksSecret(message, guard)) message = refusedText('options', secrets);
    }
    // A fresh error in final form (src/key-admission.ts, sealedError): no cause, a stack without frames, and name,
    // message and stack masked against the credentials. Then the sink check on the finished object.
    const final = sealedError(new GatewayConfigError(message), ...secrets);
    if (guard && credentials !== undefined && leaksSecret(final, guard)) {
      throw sealedError(new GatewayConfigError(refusedText('options', secrets)), ...secrets);
    }
    throw final;
  }
}

function buildSeveraGateway(options: SeveraGatewayOptions, credentials: Credentials, redactor: SecretRedactor) {
  const {
    policy: hostPolicy,
    clientId: _clientId,
    clientSecret: _clientSecret,
    baseUrl,
    timeoutMs,
    // Not gateway options: dropped even when a host passes them.
    accessToken: _accessToken,
    scope: _scope,
    credentialEnv: _credentialEnv,
    redactor: _redactor,
    acceptsIssuedToken: _acceptsIssuedToken,
    ...clientOptions
  } = options as SeveraGatewayOptions &
    Pick<SeveraClientOptions, 'accessToken' | 'scope' | 'credentialEnv' | 'redactor' | 'acceptsIssuedToken'>;
  // Always a policy: the host's, or the default one. A gateway call never reads policy or audit variables.
  const policy: ResolvedInstancePolicy = resolveInstancePolicy(hostPolicy ?? {}, GATEWAY_TOOL_NAMES);
  const client = new SeveraClient({
    ...clientOptions,
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
    scope: SEVERA_READ_SCOPE,
    baseUrl: baseUrl ?? SEVERA_DEFAULT_BASE_URL,
    timeoutMs: timeoutMs ?? DEFAULT_TIMEOUT_MS,
    credentialEnv: {},
    redactor,
    // Severa chooses the tokens, so they are checked when they arrive: one that shares a piece with a fixed fallback
    // is refused (never used), so a fallback that replaces an output never holds a piece of a token in use.
    acceptsIssuedToken: issued => !leaksSecret(fixedOutputs(), new SecretRedactor().addSecret(issued)),
  });
  const handlers = registeredTools(client);
  const offeredTools: ReadonlySet<string> = new Set(GATEWAY_TOOL_NAMES.filter(name => !policy.disabledTools.has(name)));

  return {
    /** Tools enabled on this instance (tools the host's policy disables are left out). */
    tools: severaGatewayTools.filter(tool => !policy.disabledTools.has(canonicalToolName(tool.name))),
    callTool(toolName: string, input: GatewayJsonObject = {}, context?: GatewayCallContext): Promise<GatewayToolResult> {
      // Every call in a scope of its own.
      return runInCallScope(
        {
          policy,
          redactor,
          caller: contextValue(context?.caller, redactor),
          // Our own id for the call: the host's request id is its text, and is not written to the audit.
          requestId: randomUUID(),
          offeredTools,
        },
        // A successful result is already redacted as data by normalizeResult, and its JSON text is built from that
        // data: it is not redacted again as text, which could break the JSON. An error result is our own text, and
        // is redacted as a whole.
        () =>
          runCall(toolName, input).then(result => {
            const final = result.isError ? (redactDeep(result, redactor) as GatewayToolResult) : result;
            // The sink check, as the very last step: a result that holds a piece of a credential or of an issued
            // access token anywhere, outer fields and the JSON text included, is withheld whole.
            return leaksSecret(final, redactor) ? withheldResult() : final;
          }),
      );
    },
  };

  async function runCall(toolName: string, input: GatewayJsonObject): Promise<GatewayToolResult> {
    try {
      const name = typeof toolName === 'string' ? canonicalToolName(toolName) : '';
      const tool = GATEWAY_TOOL_NAMES.includes(name) ? handlers.get(name) : undefined;
      if (!tool) {
        // Neither the audit record nor the answer repeats the name: it is the caller's text, not ours.
        await writeAuditEvent({ tool: UNKNOWN_TOOL, action: 'rejected', reason: 'unsupported tool' });
        return errorResult('Unsupported Severa gateway tool.');
      }

      const parsed = tool.inputSchema.safeParse(input ?? {});
      if (!parsed.success) {
        await writeAuditEvent({ tool: name, action: 'rejected', reason: 'invalid input' });
        const short = name.slice(TOOL_PREFIX.length);
        return errorResult(formatUnknownError(`Invalid input for ${short}: ${z.prettifyError(parsed.error)}`));
      }

      const result = await tool.handler(parsed.data as Record<string, unknown>);
      return normalizeResult(result, redactor, SUMMARIES.get(name) ?? 'Severa gateway result.');
    } catch (error) {
      return errorResult(formatUnknownError(error));
    }
  }
}

/**
 * Field names whose value is a credential whatever it looks like: the value of
 * such a field is replaced whole, not only when it matches a pattern.
 */
const CREDENTIAL_NAME =
  /^x?(authorization|proxyauthorization|cookie|setcookie|(access|refresh|id|session|bearer|auth|api|private|secret|subscription)(token|key)|token|apisecret|clientsecret|secret|password|passwd|credentials?)$/;

/**
 * Whether a field name names a credential, however it is written: case, `-`,
 * `_`, spaces and a leading `x-` do not matter (`accessToken`, `access_token`,
 * `X-Api-Key`, `x-auth-token`, `api-key`).
 */
function isCredentialField(name: string): boolean {
  return CREDENTIAL_NAME.test(name.toLowerCase().replace(/[-_\s.]/g, ''));
}

/**
 * One text as a gateway may return it: credential-shaped text masked, then the instance's own secrets, then the
 * patterns again (they take the marker as part of a value), until nothing changes.
 */
function redactText(value: string, redactor: SecretRedactor): string {
  let result = redactCredentialPatterns(value);
  for (let round = 0; round < 4; round += 1) {
    const next = redactCredentialPatterns(redactor.redact(result));
    if (next === result) break;
    result = next;
  }
  return result;
}

/**
 * A copy of a JSON value with every string, object keys included, passed
 * through the credential patterns and the redactor, the value of every
 * credential-named field (isCredentialField) replaced whole, whatever its type, and every number
 * or boolean whose string form would be redacted replaced by the string
 * "‹redacted›". Anything nested deeper than MAX_REDACT_DEPTH is replaced,
 * never passed on.
 */
function redactDeep(value: unknown, redactor: SecretRedactor, depth = 0): unknown {
  if (depth > MAX_REDACT_DEPTH) {
    return '[nested too deep]';
  }
  if (typeof value === 'string') {
    return redactText(value, redactor);
  }
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
    // The string form of a primitive is checked too; a match becomes the string "‹redacted›", so JSON stays valid.
    const text = String(value);
    if (redactText(text, redactor) !== text) return REDACTION_MARKER;
    return typeof value === 'bigint' ? text : value;
  }
  if (typeof value !== 'object' || value === null) {
    return value;
  }
  const json = (value as { toJSON?: unknown }).toJSON;
  if (typeof json === 'function') {
    return redactDeep(json.call(value), redactor, depth + 1);
  }
  if (Array.isArray(value)) {
    return value.map(entry => redactDeep(entry, redactor, depth + 1));
  }
  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [
      redactText(key, redactor),
      // The whole value of a credential-named field, whatever its type: a list or an object under it is a credential too.
      isCredentialField(key) && entry !== null && entry !== undefined ? REDACTION_MARKER : redactDeep(entry, redactor, depth + 1),
    ]),
  );
}

/** The audit's tool for a call to a tool this gateway does not have. */
const UNKNOWN_TOOL = 'unknown_tool';

/** One gateway instance, as returned by createSeveraGateway. */
export type SeveraGateway = ReturnType<typeof createSeveraGateway>;

/**
 * The handler's result as the gateway returns it. The handler's text is
 * never kept: its data is parsed, redacted twice (values, keys and numbers by
 * their string form), and only then serialised again after the summary, so a
 * secret cannot survive in an escaped form.
 */
function normalizeResult(result: unknown, redactor: SecretRedactor, summary: string): GatewayToolResult {
  if (!result || typeof result !== 'object' || !Array.isArray((result as { content?: unknown }).content)) {
    // Twice: the second pass, the last step, also covers what the first inserted (the depth placeholder).
    return jsonResult(summary, redactDeep(redactDeep(result, redactor), redactor));
  }

  const content = (result as { content: Array<{ type?: unknown; text?: unknown }> }).content;
  const text = content[0]?.text;
  if (typeof text === 'string') {
    let data: unknown;
    try {
      data = JSON.parse(text) as unknown;
    } catch {
      data = undefined;
    }
    if (data !== undefined) {
      // Twice: the second pass, the last step, also covers what the first inserted (the depth placeholder).
      return jsonResult(summary, redactDeep(redactDeep(data, redactor), redactor));
    }
  }
  // Not JSON: each text redacted on its own.
  return {
    content: content
      .filter((entry): entry is { type: 'text'; text: string } => typeof entry.text === 'string')
      .map(entry => ({ type: 'text' as const, text: redactText(entry.text, redactor) })),
  };
}

/**
 * The summary, then the same (already redacted) data as compact JSON in the text block, as the MCP spec asks of a
 * tool that returns structured content: many clients read only the text. The text holds exactly
 * `structuredContent`, and the sink check in callTool covers it.
 */
function jsonResult(text: string, structuredContent: unknown): GatewayToolResult {
  const data = toGatewayJson(structuredContent);
  return {
    content: [{ type: 'text', text: `${text}\n\n${JSON.stringify(data)}` }],
    structuredContent: data,
  };
}

function errorResult(text: string): GatewayToolResult {
  return {
    isError: true,
    content: [{ type: 'text', text }],
  };
}

function toGatewayJson(value: unknown): GatewayJsonValue {
  return JSON.parse(JSON.stringify(value ?? null)) as GatewayJsonValue;
}
