import { init } from "@sentry/nextjs";
import { ORPCInstrumentation } from "@orpc/otel";

init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  openTelemetryInstrumentations: [new ORPCInstrumentation()],
});
