// import type { tenantInvitations } from "@workspace/database/schema";
// import type { ListBaseParams } from "./base";

// export type TenantInvitationRawObject = typeof tenantInvitations.$inferSelect;

// export type CreateTenantInvitationParams =
//   typeof tenantInvitations.$inferInsert;

// export type UpdateTenantInvitationParams = Partial<
//   typeof tenantInvitations.$inferInsert
// > & {
//   id: string;
// };

// export type WhereParams = {
//   id?: string;
//   tenantId?: string;
//   email?: string;
// };

// export type JoinableParams = {
//   tenant: boolean;
// };

// export type GetTenantInvitationParams = {
//   id: string;
// };

// export type DeleteTenantInvitationParams = {
//   id: string;
// };

// export type WhereClauseParams = WhereParams & {
//   search?: string;
// };

// export type ListTenantInvitationsParams = ListBaseParams &
//   WhereParams & {
//     include?: JoinableParams;
//   };
