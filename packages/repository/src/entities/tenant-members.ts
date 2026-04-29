import type { SQL, SQLWrapper } from "@workspace/database/client";
import { and, db, desc, eq } from "@workspace/database/client";
import { tenantMembers } from "@workspace/database/schema";
import { HttpError } from "@workspace/types/errors/http";
import type {
  CreateTenantMemberParams,
  DeleteTenantMemberParams,
  FindTenantMembersParams,
  GetTenantMemberParams,
  JoinableParams,
  ListTenantMembersParams,
  TenantMemberRawObject,
  UpdateTenantMemberParams,
  WhereClauseParams,
} from "@workspace/types/repository/tenant-members";

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE_NUM = 1;

const buildSearchClause = (_search?: string) => {
  // No searchable text fields on tenant_members
  return undefined;
};

const buildWhere = (whereables: WhereClauseParams) => {
  const { id, userId, tenantId } = whereables;

  const whereClause: SQLWrapper[] = [];
  if (id) {
    whereClause.push(eq(tenantMembers.id, id));
  }
  if (userId) {
    whereClause.push(eq(tenantMembers.userId, userId));
  }
  if (tenantId) {
    whereClause.push(eq(tenantMembers.tenantId, tenantId));
  }

  return and(...whereClause);
};

const buildWhereClause = (params: WhereClauseParams): SQL | undefined => {
  const { search, ...data } = params;
  const searchClause = buildSearchClause(search);
  const where = buildWhere(data);

  const whereClause: SQLWrapper[] = [];
  if (searchClause) {
    whereClause.push(searchClause);
  }
  if (where) {
    whereClause.push(where);
  }

  return and(...whereClause);
};

const buildJoinClause = (include: JoinableParams | undefined) => {
  const joinClause: Record<string, boolean> = {};

  if (include?.user) {
    joinClause.user = true;
  }
  if (include?.tenant) {
    joinClause.tenant = true;
  }

  return joinClause;
};

export const list = async (params: ListTenantMembersParams) => {
  const {
    search,
    pageNum = DEFAULT_PAGE_NUM,
    pageSize = DEFAULT_PAGE_SIZE,
    include,
    ...rest
  } = params;

  const offset = (pageNum - 1) * pageSize;

  const data = await db.query.tenantMembers.findMany({
    where: buildWhereClause({ search, ...rest }),
    orderBy: desc(tenantMembers.createdAt),
    limit: pageSize,
    offset,
    with: buildJoinClause(include),
  });

  return data;
};

export const get = async (
  params: GetTenantMemberParams
): Promise<TenantMemberRawObject> => {
  const { id } = params;

  const member = await db.query.tenantMembers.findFirst({
    where: eq(tenantMembers.id, id),
  });

  if (!member) {
    throw new HttpError(404, "Tenant member not found");
  }

  return member;
};

export const find = async (
  params: FindTenantMembersParams
): Promise<TenantMemberRawObject[]> => {
  const { include, ...rest } = params;

  return await db.query.tenantMembers.findMany({
    where: buildWhereClause(rest),
    with: buildJoinClause(include),
  });
};

export const create = async (
  params: CreateTenantMemberParams
): Promise<TenantMemberRawObject> => {
  const result = await db.insert(tenantMembers).values(params).returning();

  const member = result[0];
  if (!member) {
    throw new HttpError(500, "Failed to create tenant member");
  }

  return member;
};

export const updateOne = async (
  params: UpdateTenantMemberParams
): Promise<TenantMemberRawObject> => {
  const { id, ...data } = params;

  const result = await db
    .update(tenantMembers)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(tenantMembers.id, id))
    .returning();

  const member = result[0];
  if (!member) {
    throw new HttpError(404, "Tenant member not found");
  }

  return member;
};

export const deleteOne = async (
  params: DeleteTenantMemberParams
): Promise<TenantMemberRawObject> => {
  const { id } = params;

  const result = await db
    .delete(tenantMembers)
    .where(eq(tenantMembers.id, id))
    .returning();

  const member = result[0];
  if (!member) {
    throw new HttpError(404, "Tenant member not found");
  }

  return member;
};
