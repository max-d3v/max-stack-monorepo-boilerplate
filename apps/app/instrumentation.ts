import { captureRequestError } from "@sentry/nextjs";
import { instrumentation as orpcInstrumentation } from "@workspace/observability/app/";
import { instrumentation as prismaInstrumentation } from "@trazo/observability/prisma";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

import { registerOTel } from "@vercel/otel";

export async function register() {
  await import("@workspace/rpc/orpc/orpc.server");

  registerOTel{
    serviceName: "app",
    instrumentations: [orpcInstrumentation, prismaInstrumentation],
    traceExporter: new OTLPTraceExporter({
      url: process.env.SENTRY_TRACE_EXPORTER_URL,
      headers: {
        "x-sentry-auth": `sentry sentry_key=${process.env.SENTRY_TRACE_EXPORTER_SECRET_KEY}`,
      },
    }),
  });

  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("@workspace/observability/app/sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("@workspace/observability/app/sentry.edge.config");
  }
}

export const onRequestError = captureRequestError;
