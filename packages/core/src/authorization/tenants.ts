// import { find } from "@workspace/repository/entities/tenant-members";
// import { HttpError } from "@workspace/types/errors/http";
// import type { TenantRole } from "@workspace/types/use-cases/tenants";

// export const authorizeUserToUpdateTenantMember = async (
//   params: {
//         userId: string,
//         tenantMemberId: string,
//         tenantId: string
//     }
// ) => {
//   const { userId, tenantMemberId, tenantId } = params;

//   const { userRole, tenantMemberRole } = await fetchUserRoles({
//     userId,
//     tenantMemberId,
//     tenantId,
//   });

//   return userCanUpdateTenantMember({ userRole, tenantMemberRole });
// };

// export const fetchUserRoles = async (params: {
//     userId: string,
//     tenantMemberId: string,
//     tenantId: string
// }) => {
//     const { userId, tenantMemberId, tenantId } = params;

//     const [user, tenantMember] = await Promise.all([
//       find({ userId, tenantId }),
//       find({ userId: tenantMemberId, tenantId }),
//     ]);

//     return {
//         userRole: user.tenantRole,
//         tenantMemberRole: tenantMember.tenantRole,
//     };
// }

// export const userCanUpdateTenantMember = (params: {
//     userRole: TenantRole,
//     tenantMemberRole?: TenantRole
// }) => {
//     const { userRole, tenantMemberRole } = params;
//     if (userRole === "member") {
//         return false;
//     }

//     if (!tenantMemberRole) {
//         throw new HttpError(400, "Authorization gate error: Tenant member role is required");
//     }

//     if (userRole === "admin" && tenantMemberRole === "owner") {
//         return false;
//     }

//     return true;
// }
