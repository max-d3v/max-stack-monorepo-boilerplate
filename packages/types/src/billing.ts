import type { StripeSubscription } from "@workspace/payment";
import { z } from "zod";

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
};

export type ApiErrorResponse = {
  success: boolean;
  error: string;
  details?: string;
};

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

export type CreateCheckoutSessionResponse = ApiResponse<{
  url: string;
  sessionId: string;
}>;
export type SubscriptionResponse = ApiResponse<{
  subscription: StripeSubscription | null;
  plan: string;
}>;
export type CreatePortalSessionResponse = ApiResponse<{
  url: string;
}>;
export type DeleteSubscriptionResponse = ApiResponse<{
  deleted: boolean;
}>;
