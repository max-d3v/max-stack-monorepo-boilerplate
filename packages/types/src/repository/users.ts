import type { users } from "@workspace/database/schema";
import type { ListBaseParams } from "./base";

export type UserRawObject = typeof users.$inferSelect;

export type CreateUserParams = typeof users.$inferInsert;

export type UpdateUserParams = Partial<typeof users.$inferInsert> & {
  clerkId: string;
};

export type WhereParams = {
  id?: string;
  clerkId?: string;
  email?: string;
  tenantId?: string;
};

export type JoinableParams = {
  tenant: boolean;
  preferences: boolean;
  tasks: boolean;
  memberships: boolean;
};

export type GetUserParams = {
  id: string;
};

export type GetUserByClerkIdParams = {
  clerkId: string;
};

export type DeleteUserParams = {
  clerkId: string;
};

export type WhereClauseParams = WhereParams & {
  search?: string;
};

export type ListUsersParams = ListBaseParams &
  WhereParams & {
    include?: JoinableParams;
  };
