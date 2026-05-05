import { z } from "zod";

export const stripeWebhookInputSchema = z.object({
  payload: z.string().min(1),
  signature: z.string().min(1),
});

export type StripeWebhookInput = z.infer<typeof stripeWebhookInputSchema>;

export const handleStripeWebhookSchema = stripeWebhookInputSchema;
export type HandleStripeWebhook = z.infer<typeof handleStripeWebhookSchema>;

export type HandleStripeWebhookResponse = { received: true };
