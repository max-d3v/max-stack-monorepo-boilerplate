import { AxiomJSTransport, Logger } from "@axiomhq/logging";
import { createAxiomRouteHandler, nextJsFormatters } from "@axiomhq/nextjs";
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

export const withAxiom = createAxiomRouteHandler(logger);
