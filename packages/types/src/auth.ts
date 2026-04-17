import { z } from "zod";

// These schemas copy clerks schema. (adjusted for what we use)

export const webhookEventSchema = z.object({
  type: z.enum(["user.created", "user.updated", "user.deleted"]),
  data: z.object({
    id: z.string(),
    email_addresses: z.array(
      z.object({
        email_address: z.string(),
        id: z.string(),
      })
    ),
    primary_email_address_id: z.string(),
    first_name: z.string(),
    last_name: z.string(),
  }),
});

export const userJSONSchema = z.object({
  id: z.string(),
  email_addresses: z.array(
    z.object({
      email_address: z.string(),
      id: z.string(),
    })
  ),
  primary_email_address_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  image_url: z.string().optional(),
});

export type WebhookEvent = z.infer<typeof webhookEventSchema>;
export type UserJSON = z.infer<typeof userJSONSchema>;
