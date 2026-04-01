"use client";
import { AxiomJSTransport, Logger } from "@axiomhq/logging";
import { nextJsFormatters } from "@axiomhq/nextjs/client";
import { createUseLogger, createWebVitalsComponent } from "@axiomhq/react";
import axiomClient from "./axiom";

const AXIOM_DATASET = process.env.NEXT_PUBLIC_AXIOM_DATASET || "orion-kit";

export const logger = new Logger({
  transports: [
    new AxiomJSTransport({
      axiom: axiomClient,
      dataset: AXIOM_DATASET,
    }),
  ],
  formatters: nextJsFormatters,
});

const useLogger = createUseLogger(logger);
const WebVitals = createWebVitalsComponent(logger);

export { useLogger, WebVitals };
