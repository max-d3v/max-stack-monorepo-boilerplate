import { z } from "zod";

export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  emailVerified: boolean;
};

export const updateProfileInputSchema = z.object({
  name: z.string().min(1),
});

export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>;

export type UpdateProfileResponse = AuthUser;

export type DeleteAccountResponse = { deleted: boolean };

export const getUserSchema = z.object({
  id: z.string().min(1),
});

export const updateProfileSchema = updateProfileInputSchema.extend({
  userId: z.string().min(1),
});

export const deleteAccountSchema = z.object({
  userId: z.string().min(1),
});

export type GetUser = z.infer<typeof getUserSchema>;
export type UpdateProfile = z.infer<typeof updateProfileSchema>;
export type DeleteAccount = z.infer<typeof deleteAccountSchema>;
