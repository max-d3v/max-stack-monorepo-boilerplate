import { handleAuthWebhook } from "@workspace/core/use-cases/auth";
import { handleStripeWebhook } from "@workspace/core/use-cases/payments";
import { webhookEventSchema } from "@workspace/types/auth";
import { stripeWebhookInputSchema } from "@workspace/types/use-cases/payments";
import { webhookProcedure } from "../base";

const webhookRouter = {
  stripe: webhookProcedure
    .input(stripeWebhookInputSchema)
    .handler(async ({ input }) => {
      return await handleStripeWebhook(input);
    }),
  auth: webhookProcedure
    .input(webhookEventSchema)
    .handler(async ({ input }) => {
      return await handleAuthWebhook(input);
    }),
};

export default webhookRouter;
