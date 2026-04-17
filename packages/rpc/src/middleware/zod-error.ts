import { ORPCError } from "@orpc/client";
import { os, ValidationError } from "@orpc/server";

type ValidationIssue = {
  readonly message: string;
  readonly path?: ReadonlyArray<PropertyKey | { readonly key: PropertyKey }>;
  readonly code?: string;
  readonly expected?: unknown;
  readonly received?: unknown;
  readonly input?: unknown;
  readonly origin?: string;
  readonly format?: string;
  readonly pattern?: string;
  readonly minimum?: number | bigint;
  readonly maximum?: number | bigint;
  readonly inclusive?: boolean;
  readonly keys?: readonly string[];
  readonly values?: readonly unknown[];
  readonly divisor?: number;
};

const ANSI = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  gray: "\x1b[90m",
} as const;

const USE_COLOR =
  typeof process !== "undefined" &&
  process.stdout?.isTTY === true &&
  process.env.NO_COLOR === undefined;

const paint = (text: string, color: keyof typeof ANSI): string =>
  USE_COLOR ? `${ANSI[color]}${text}${ANSI.reset}` : text;

const DIVIDER = "─".repeat(72);

const OUTPUT_VALIDATION_PATTERN = /output/i;

const EXTRA_ISSUE_FIELDS = [
  "expected",
  "received",
  "origin",
  "format",
  "pattern",
  "minimum",
  "maximum",
  "inclusive",
  "keys",
  "values",
  "divisor",
] as const satisfies ReadonlyArray<keyof ValidationIssue>;

function formatIssuePath(path: ValidationIssue["path"]): string {
  if (!path || path.length === 0) {
    return "(root)";
  }

  return path
    .map((segment) => {
      const key =
        typeof segment === "object" && segment !== null && "key" in segment
          ? segment.key
          : segment;
      return String(key);
    })
    .join(".");
}

function safeStringify(value: unknown): string {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function indent(text: string, prefix: string): string {
  return text
    .split("\n")
    .map((line) => `${prefix}${line}`)
    .join("\n");
}

function formatIssue(issue: ValidationIssue, index: number): string {
  const field = paint(formatIssuePath(issue.path), "cyan");
  const header = `${paint(`${index + 1}.`, "dim")} ${paint("✗", "red")} ${paint(
    "field:",
    "dim"
  )} ${field}`;

  const lines: string[] = [header];
  lines.push(`     ${paint("message:", "dim")} ${issue.message}`);

  if (issue.code) {
    lines.push(`     ${paint("code:", "dim")} ${issue.code}`);
  }

  for (const key of EXTRA_ISSUE_FIELDS) {
    const raw = issue[key];
    if (raw === undefined) {
      continue;
    }
    const formatted =
      typeof raw === "string" ? raw : safeStringify(raw as unknown);
    lines.push(`     ${paint(`${key}:`, "dim")} ${formatted}`);
  }

  if ("input" in issue && issue.input !== undefined) {
    lines.push(
      `     ${paint("input:", "dim")} ${safeStringify(issue.input as unknown)}`
    );
  }

  return lines.join("\n");
}

type LogOptions = {
  readonly procedurePath: readonly string[];
  readonly error: ValidationError;
  readonly input: unknown;
};

function logValidationError({ procedurePath, error, input }: LogOptions): void {
  const issues = (error.issues ?? []) as ValidationIssue[];
  const isOutput = OUTPUT_VALIDATION_PATTERN.test(error.message);
  const title = isOutput
    ? "oRPC Output Validation Failed"
    : "oRPC Input Validation Failed";
  const procedureLabel =
    procedurePath.length > 0 ? procedurePath.join(".") : "(unknown)";

  const formattedIssues = issues.map(formatIssue).join("\n\n");

  const block = [
    "",
    paint(DIVIDER, "yellow"),
    `  ${paint("⚠", "yellow")} ${paint(title, "bold")}`,
    paint(DIVIDER, "yellow"),
    `  ${paint("procedure:", "dim")} ${paint(procedureLabel, "magenta")}`,
    `  ${paint("issues:", "dim")} ${issues.length}`,
    "",
    indent(formattedIssues, "  "),
    "",
    `  ${paint("received input:", "dim")}`,
    indent(safeStringify(input), "  "),
    paint(DIVIDER, "yellow"),
    "",
  ].join("\n");

  console.error(block);
}


function extractValidationError(error: unknown): ValidationError | null {
  if (error instanceof ValidationError) {
    return error;
  }
  if (error instanceof ORPCError && error.cause instanceof ValidationError) {
    return error.cause;
  }
  return null;
}


export const ZOD_ERROR_LOGGED_FLAG = Symbol.for(
  "@workspace/rpc/zod-error-logged"
);

type LoggedError = Error & { [ZOD_ERROR_LOGGED_FLAG]?: true };

export function wasZodErrorLogged(error: unknown): boolean {
  return Boolean(
    error &&
      typeof error === "object" &&
      (error as LoggedError)[ZOD_ERROR_LOGGED_FLAG]
  );
}


export const zodErrorLoggerMiddleware = os.middleware(
  async ({ next, path }, input) => {
    try {
      return await next();
    } catch (error) {
      const validationError = extractValidationError(error);
      if (validationError) {
        logValidationError({
          procedurePath: path,
          error: validationError,
          input,
        });

        if (error && typeof error === "object") {
          (error as LoggedError)[ZOD_ERROR_LOGGED_FLAG] = true;
        }
      }
      throw error;
    }
  }
);