import {
  cancelUserSubscription,
  createUserBillingPortalSession,
  createUserCheckoutSession,
  getSubscriptionStatus,
} from "@workspace/core/use-cases/billing";
import { createCheckoutSessionInputSchema } from "@workspace/types/use-cases/billing";
import { authenticatedProcedure } from "../procedures";

const billingRouter = {
  getSubscription: authenticatedProcedure.handler(async ({ context }) => {
    const { id } = context.user;
    return await getSubscriptionStatus({ userId: id });
  }),

  cancelSubscription: authenticatedProcedure.handler(async ({ context }) => {
    const { id } = context.user;
    return await cancelUserSubscription({ userId: id });
  }),

  createCheckoutSession: authenticatedProcedure
    .input(createCheckoutSessionInputSchema)
    .handler(async ({ context, input }) => {
      const user = context.user as Record<string, unknown>;
      const userId = context.user.id;
      const email = (user.email as string) ?? "";
      return await createUserCheckoutSession({ userId, email, ...input });
    }),

  createBillingPortalSession: authenticatedProcedure.handler(
    async ({ context }) => {
      const { id } = context.user;
      return await createUserBillingPortalSession({ userId: id });
    }
  ),
};

export default billingRouter;
