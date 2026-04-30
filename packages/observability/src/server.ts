export * from "@sentry/nextjs";

export const isObservabilityEnabled =
  process.env.NEXT_PUBLIC_SENTRY_DSN !== undefined;
