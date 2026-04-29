import type { tenants } from "@workspace/database/schema";
import type { ListBaseParams } from "./base";

export type TenantRawObject = typeof tenants.$inferSelect;

export type CreateTenantParams = typeof tenants.$inferInsert;

export type UpdateTenantParams = Partial<typeof tenants.$inferInsert> & {
  id: string;
};

export type WhereParams = {
  id?: string;
  slug?: string;
};

export type JoinableParams = {
  users: boolean;
  members: boolean;
  invitations: boolean;
};

export type GetTenantParams = {
  id: string;
};

export type DeleteTenantParams = {
  id: string;
};

export type WhereClauseParams = WhereParams & {
  search?: string;
};

export type ListTenantsParams = ListBaseParams &
  WhereParams & {
    include?: JoinableParams;
  };
