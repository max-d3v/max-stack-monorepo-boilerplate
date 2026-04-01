import { z } from "zod";

export const createCheckoutSessionInputSchema = z.object({
  priceId: z.string().min(1, "Price ID is required"),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

export type CreateCheckoutSessionInput = z.infer<
  typeof createCheckoutSessionInputSchema
>;

export type {
  CheckoutSession,
  PortalSession,
  PricingPlan,
  StripeSubscription,
  SubscriptionData,
} from "@workspace/payment";

export {
  canUpgrade,
  getPlanById,
  getPlanByPriceId,
  isFreePlan,
  PLANS,
} from "@workspace/payment/config";

export type CreateCheckoutSessionResponse = {
  url: string;
  sessionId: string;
};
export type SubscriptionResponse = {
  subscription: any | null;
  plan: string;
};
export type CreatePortalSessionResponse = {
  url: string;
};
export type DeleteSubscriptionResponse = {
  deleted: boolean;
};
