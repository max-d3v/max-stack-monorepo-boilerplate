import { captureRequestError } from "@sentry/nextjs";
import { registerOTel } from "@vercel/otel";
import {
  config,
} from "@workspace/observability/app/otel-config";
import { isObservabilityEnabled } from "@workspace/observability/server";

export async function register() {
  await import("@workspace/rpc/orpc/orpc.server");

  registerOTel(config);
  
  if (process.env.NEXT_RUNTIME === "nodejs") {
    if (!isObservabilityEnabled) {
      return;
    }

    await import("@workspace/observability/app/sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    if (!isObservabilityEnabled) {
      return;
    }

    await import("@workspace/observability/app/sentry.edge.config");
  }
}

// Safe to export unconditionally — `captureRequestError` is a no-op
// when Sentry hasn't been initialized.
export const onRequestError = captureRequestError;
