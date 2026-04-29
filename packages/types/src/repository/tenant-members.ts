import type { tenantMembers } from "@workspace/database/schema";
import type { ListBaseParams } from "./base";

export type TenantMemberRawObject = typeof tenantMembers.$inferSelect;

export type CreateTenantMemberParams = typeof tenantMembers.$inferInsert;

export type UpdateTenantMemberParams = Partial<
  typeof tenantMembers.$inferInsert
> & {
  id: string;
};

export type WhereParams = {
  id?: string;
  userId?: string;
  tenantId?: string;
};

export type JoinableParams = {
  user: boolean;
  tenant: boolean;
};

export type GetTenantMemberParams = {
  id: string;
};

export type DeleteTenantMemberParams = {
  id: string;
};

export type WhereClauseParams = WhereParams & {
  search?: string;
};

export type ListTenantMembersParams = ListBaseParams &
  WhereParams & {
    include?: JoinableParams;
  };

export type FindTenantMembersParams = WhereParams & {
  include?: JoinableParams;
};
