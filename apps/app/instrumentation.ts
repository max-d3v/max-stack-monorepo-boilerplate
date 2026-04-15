import { captureRequestError } from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("@workspace/rpc/orpc/orpc.server");
    await import("@workspace/observability/app/sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("@workspace/observability/app/sentry.edge.config");
  }
}

export const onRequestError = captureRequestError;
