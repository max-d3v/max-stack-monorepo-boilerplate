import type { SQL, SQLWrapper } from "@workspace/database/client";
import { and, db, desc, eq, ilike, or } from "@workspace/database/client";
import { tenants } from "@workspace/database/schema";
import { HttpError } from "@workspace/types/errors/http";
import type {
  CreateTenantParams,
  DeleteTenantParams,
  GetTenantParams,
  JoinableParams,
  ListTenantsParams,
  TenantRawObject,
  UpdateTenantParams,
  WhereClauseParams,
} from "@workspace/types/repository/tenants";

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE_NUM = 1;

const buildSearchClause = (search?: string) => {
  if (!search) {
    return undefined;
  }
  return or(
    ilike(tenants.name, `%${search}%`),
    ilike(tenants.slug, `%${search}%`)
  );
};

const buildWhere = (whereables: WhereClauseParams) => {
  const { id, slug } = whereables;

  const whereClause: SQLWrapper[] = [];
  if (id) {
    whereClause.push(eq(tenants.id, id));
  }
  if (slug) {
    whereClause.push(eq(tenants.slug, slug));
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

  if (include?.users) {
    joinClause.users = true;
  }
  if (include?.members) {
    joinClause.members = true;
  }
  if (include?.invitations) {
    joinClause.invitations = true;
  }

  return joinClause;
};

export const list = async (params: ListTenantsParams) => {
  const {
    search,
    pageNum = DEFAULT_PAGE_NUM,
    pageSize = DEFAULT_PAGE_SIZE,
    include,
    ...rest
  } = params;

  const offset = (pageNum - 1) * pageSize;

  const data = await db.query.tenants.findMany({
    where: buildWhereClause({ search, ...rest }),
    orderBy: desc(tenants.createdAt),
    limit: pageSize,
    offset,
    with: buildJoinClause(include),
  });

  return data;
};

export const get = async (
  params: GetTenantParams
): Promise<TenantRawObject> => {
  const { id } = params;

  const tenant = await db.query.tenants.findFirst({
    where: eq(tenants.id, id),
  });

  if (!tenant) {
    throw new HttpError(404, "Tenant not found");
  }

  return tenant;
};

export const create = async (
  params: CreateTenantParams
): Promise<TenantRawObject> => {
  const result = await db.insert(tenants).values(params).returning();

  const tenant = result[0];
  if (!tenant) {
    throw new HttpError(500, "Failed to create tenant");
  }

  return tenant;
};

export const updateOne = async (
  params: UpdateTenantParams
): Promise<TenantRawObject> => {
  const { id, ...data } = params;

  const result = await db
    .update(tenants)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(tenants.id, id))
    .returning();

  const tenant = result[0];
  if (!tenant) {
    throw new HttpError(404, "Tenant not found");
  }

  return tenant;
};

export const deleteOne = async (
  params: DeleteTenantParams
): Promise<TenantRawObject> => {
  const { id } = params;

  const result = await db.delete(tenants).where(eq(tenants.id, id)).returning();

  const tenant = result[0];
  if (!tenant) {
    throw new HttpError(404, "Tenant not found");
  }

  return tenant;
};
