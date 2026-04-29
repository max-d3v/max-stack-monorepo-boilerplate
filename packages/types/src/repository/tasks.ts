import type { tasks } from "@workspace/database/schema";
import type { ListBaseParams } from "./base";

export type TaskRawObject = typeof tasks.$inferSelect;

export type CreateTaskParams = typeof tasks.$inferInsert;

export type UpdateTaskParams = Partial<typeof tasks.$inferInsert> & {
  id: string;
  userId: string;
};

export type WhereParams = {
  userId: string;
  tenantId?: string;
};

export type JoinableParams = {
  users: boolean;
  tenants: boolean;
};

export type GetTaskParams = {
  id: string;
};

export type DeleteTaskParams = {
  id: string;
  userId: string;
};

export type WhereClauseParams = WhereParams & {
  search?: string;
};

export type ListTasksParams = ListBaseParams &
  WhereParams & {
    include?: JoinableParams;
  };
