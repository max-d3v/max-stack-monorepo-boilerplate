import type { userPreference } from "@workspace/database/schema";
import type { ListBaseParams } from "./base";

export type UserPreferenceRawObject = typeof userPreference.$inferSelect;

export type CreateUserPreferenceParams = typeof userPreference.$inferInsert;

export type UpdateUserPreferenceParams = Partial<
  typeof userPreference.$inferInsert
> & {
  userId: string;
};

export type WhereParams = {
  userId?: string;
};

export type JoinableParams = {
  user: boolean;
};

export type GetUserPreferenceParams = {
  userId: string;
};

export type DeleteUserPreferenceParams = {
  userId: string;
};

export type WhereClauseParams = WhereParams & {
  search?: string;
};

export type ListUserPreferencesParams = ListBaseParams &
  WhereParams & {
    include?: JoinableParams;
  };
