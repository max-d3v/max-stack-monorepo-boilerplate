import { z } from "zod";
import type { UserPreferenceRawObject } from "../repository/user-preferences";

export type UserPreference = UserPreferenceRawObject;
export type PreferencesResponse = UserPreferenceRawObject;
export type UpdatePreferencesResponse = UserPreferenceRawObject;

export const updatePreferencesInputSchema = z.object({
  theme: z.string().optional(),
  language: z.string().optional(),
  timezone: z.string().optional(),
  defaultTaskStatus: z.string().optional(),
  emailNotifications: z.string().optional(),
  taskReminders: z.string().optional(),
  weeklyDigest: z.string().optional(),
  pushNotifications: z.string().optional(),
});

export type UpdatePreferencesInput = z.infer<
  typeof updatePreferencesInputSchema
>;

export const getOrCreatePreferencesSchema = z.object({
  userId: z.string().uuid(),
});

export const updatePreferencesSchema = z.object({
  userId: z.string().uuid(),
  data: updatePreferencesInputSchema,
});

export type GetOrCreatePreferences = z.infer<
  typeof getOrCreatePreferencesSchema
>;
export type UpdatePreferences = z.infer<typeof updatePreferencesSchema>;
