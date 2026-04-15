import { captureRequestError } from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("@workspace/observability/api/sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("@workspace/observability/api/sentry.edge.config");
  }
}

export const onRequestError = captureRequestError;
