import { z } from "zod";

export const createCheckoutSessionInputSchema = z.object({
  priceId: z.string().min(1),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

export type CreateCheckoutSessionInput = z.infer<
  typeof createCheckoutSessionInputSchema
>;

export const getSubscriptionStatusSchema = z.object({
  userId: z.string().uuid(),
});

export const cancelUserSubscriptionSchema = z.object({
  userId: z.string().uuid(),
});

export const createUserCheckoutSessionSchema = z.object({
  userId: z.string().uuid(),
  email: z.string().email(),
  priceId: z.string().min(1),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

export const createUserBillingPortalSessionSchema = z.object({
  userId: z.string().uuid(),
});

export type GetSubscriptionStatus = z.infer<typeof getSubscriptionStatusSchema>;
export type CancelUserSubscription = z.infer<
  typeof cancelUserSubscriptionSchema
>;
export type CreateUserCheckoutSession = z.infer<
  typeof createUserCheckoutSessionSchema
>;
export type CreateUserBillingPortalSession = z.infer<
  typeof createUserBillingPortalSessionSchema
>;
