// import type { SQL, SQLWrapper } from "@workspace/database/client";
// import { and, db, desc, eq, ilike } from "@workspace/database/client";
// import { tenantInvitations } from "@workspace/database/schema";
// import { HttpError } from "@workspace/types/errors/http";
// import type {
//   CreateTenantInvitationParams,
//   DeleteTenantInvitationParams,
//   GetTenantInvitationParams,
//   JoinableParams,
//   ListTenantInvitationsParams,
//   TenantInvitationRawObject,
//   UpdateTenantInvitationParams,
//   WhereClauseParams,
// } from "@workspace/types/repository/tenant-invitations";

// const DEFAULT_PAGE_SIZE = 20;
// const DEFAULT_PAGE_NUM = 1;

// const buildSearchClause = (search?: string) => {
//   if (!search) {
//     return undefined;
//   }
//   return ilike(tenantInvitations.email, `%${search}%`);
// };

// const buildWhere = (whereables: WhereClauseParams) => {
//   const { id, tenantId, email } = whereables;

//   const whereClause: SQLWrapper[] = [];
//   if (id) {
//     whereClause.push(eq(tenantInvitations.id, id));
//   }
//   if (tenantId) {
//     whereClause.push(eq(tenantInvitations.tenantId, tenantId));
//   }
//   if (email) {
//     whereClause.push(eq(tenantInvitations.email, email));
//   }

//   return and(...whereClause);
// };

// const buildWhereClause = (params: WhereClauseParams): SQL | undefined => {
//   const { search, ...data } = params;
//   const searchClause = buildSearchClause(search);
//   const where = buildWhere(data);

//   const whereClause: SQLWrapper[] = [];
//   if (searchClause) {
//     whereClause.push(searchClause);
//   }
//   if (where) {
//     whereClause.push(where);
//   }

//   return and(...whereClause);
// };

// const buildJoinClause = (include: JoinableParams | undefined) => {
//   const joinClause: Record<string, boolean> = {};

//   if (include?.tenant) {
//     joinClause.tenant = true;
//   }

//   return joinClause;
// };

// export const list = async (params: ListTenantInvitationsParams) => {
//   const {
//     search,
//     pageNum = DEFAULT_PAGE_NUM,
//     pageSize = DEFAULT_PAGE_SIZE,
//     include,
//     ...rest
//   } = params;

//   const offset = (pageNum - 1) * pageSize;

//   const data = await db.query.tenantInvitations.findMany({
//     where: buildWhereClause({ search, ...rest }),
//     orderBy: desc(tenantInvitations.createdAt),
//     limit: pageSize,
//     offset,
//     with: buildJoinClause(include),
//   });

//   return data;
// };

// export const get = async (
//   params: GetTenantInvitationParams
// ): Promise<TenantInvitationRawObject> => {
//   const { id } = params;

//   const invitation = await db.query.tenantInvitations.findFirst({
//     where: eq(tenantInvitations.id, id),
//   });

//   if (!invitation) {
//     throw new HttpError(404, "Tenant invitation not found");
//   }

//   return invitation;
// };

// export const create = async (
//   params: CreateTenantInvitationParams
// ): Promise<TenantInvitationRawObject> => {
//   const result = await db.insert(tenantInvitations).values(params).returning();

//   const invitation = result[0];
//   if (!invitation) {
//     throw new HttpError(500, "Failed to create tenant invitation");
//   }

//   return invitation;
// };

// export const updateOne = async (
//   params: UpdateTenantInvitationParams
// ): Promise<TenantInvitationRawObject> => {
//   const { id, ...data } = params;

//   const result = await db
//     .update(tenantInvitations)
//     .set({ ...data, updatedAt: new Date() })
//     .where(eq(tenantInvitations.id, id))
//     .returning();

//   const invitation = result[0];
//   if (!invitation) {
//     throw new HttpError(404, "Tenant invitation not found");
//   }

//   return invitation;
// };

// export const deleteOne = async (
//   params: DeleteTenantInvitationParams
// ): Promise<TenantInvitationRawObject> => {
//   const { id } = params;

//   const result = await db
//     .delete(tenantInvitations)
//     .where(eq(tenantInvitations.id, id))
//     .returning();

//   const invitation = result[0];
//   if (!invitation) {
//     throw new HttpError(404, "Tenant invitation not found");
//   }

//   return invitation;
// };
