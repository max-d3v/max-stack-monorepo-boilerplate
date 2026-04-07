import type { ApiResponse } from "../billing";
import { z } from "zod";

export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  emailVerified: boolean | null;
};
export type AuthResponse = ApiResponse<AuthUser>;
export type LoginInput = { email: string; password: string };
export type LoginResponse = ApiResponse<AuthUser>;
export type RegisterInput = { email: string; password: string; name: string };
export type RegisterResponse = ApiResponse<AuthUser>;
export type LogoutResponse = ApiResponse<null>;
export type UpdateProfileResponse = ApiResponse<unknown>;
export type DeleteAccountResponse = ApiResponse<{ deleted: boolean }>;

export const updateProfileInputSchema = z.object({
  name: z.string().min(1),
});

export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>;
