import { handleStripeWebhook } from "@workspace/core/use-cases/webhook";
import { stripeWebhookInputSchema } from "@workspace/types/use-cases/webhook";
import { webhookProcedure } from "../base";

const webhookRouter = {
  stripe: webhookProcedure
    .input(stripeWebhookInputSchema)
    .handler(async ({ input }) => {
      return await handleStripeWebhook(input);
    }),
};

export default webhookRouter;
