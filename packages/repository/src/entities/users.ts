import type { SQL, SQLWrapper } from "@workspace/database/client";
import { and, db, desc, eq, ilike, or } from "@workspace/database/client";
import { users } from "@workspace/database/schema";
import { HttpError } from "@workspace/types/errors/http";
import type {
  CreateUserParams,
  DeleteUserParams,
  GetUserByClerkIdParams,
  GetUserParams,
  JoinableParams,
  ListUsersParams,
  UpdateUserParams,
  UserRawObject,
  WhereClauseParams,
} from "@workspace/types/repository/users";

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE_NUM = 1;

const buildSearchClause = (search?: string) => {
  if (!search) {
    return undefined;
  }
  return or(
    ilike(users.name, `%${search}%`),
    ilike(users.email, `%${search}%`)
  );
};

const buildWhere = (whereables: WhereClauseParams) => {
  const { id, clerkId, email, tenantId } = whereables;

  const whereClause: SQLWrapper[] = [];
  if (id) {
    whereClause.push(eq(users.id, id));
  }
  if (clerkId) {
    whereClause.push(eq(users.clerkId, clerkId));
  }
  if (email) {
    whereClause.push(eq(users.email, email));
  }
  if (tenantId) {
    whereClause.push(eq(users.tenantId, tenantId));
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

  if (include?.tenant) {
    joinClause.tenant = true;
  }
  if (include?.preferences) {
    joinClause.preferences = true;
  }
  if (include?.tasks) {
    joinClause.tasks = true;
  }
  if (include?.memberships) {
    joinClause.memberships = true;
  }

  return joinClause;
};

export const list = async (params: ListUsersParams) => {
  const {
    search,
    pageNum = DEFAULT_PAGE_NUM,
    pageSize = DEFAULT_PAGE_SIZE,
    include,
    ...rest
  } = params;

  const offset = (pageNum - 1) * pageSize;

  const data = await db.query.users.findMany({
    where: buildWhereClause({ search, ...rest }),
    orderBy: desc(users.createdAt),
    limit: pageSize,
    offset,
    with: buildJoinClause(include),
  });

  return data;
};

export const get = async (params: GetUserParams): Promise<UserRawObject> => {
  const { id } = params;

  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  });

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  return user;
};

export const getByClerkId = async (
  params: GetUserByClerkIdParams
): Promise<UserRawObject> => {
  const { clerkId } = params;

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, clerkId),
  });

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  return user;
};

export const find = async (clerkId: string): Promise<UserRawObject[]> => {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkId))
    .orderBy(desc(users.createdAt))
    .limit(1);

  return result;
};

export const create = async (
  params: CreateUserParams
): Promise<UserRawObject> => {
  const result = await db.insert(users).values(params).returning();

  const user = result[0];
  if (!user) {
    throw new HttpError(500, "Failed to create user");
  }

  return user;
};

export const upsertByClerkId = async (
  params: CreateUserParams
): Promise<UserRawObject> => {
  const { clerkId, ...rest } = params;

  const result = await db
    .insert(users)
    .values({ clerkId, ...rest })
    .onConflictDoUpdate({
      target: users.clerkId,
      set: { ...rest, updatedAt: new Date() },
    })
    .returning();

  const user = result[0];
  if (!user) {
    throw new HttpError(500, "Failed to upsert user");
  }

  return user;
};

export const updateOne = async (
  params: UpdateUserParams
): Promise<UserRawObject> => {
  const { clerkId, ...data } = params;

  const result = await db
    .update(users)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(users.clerkId, clerkId))
    .returning();

  const user = result[0];
  if (!user) {
    throw new HttpError(404, "User not found");
  }

  return user;
};

export const deleteOne = async (
  params: DeleteUserParams
): Promise<UserRawObject> => {
  const { clerkId } = params;

  const result = await db
    .delete(users)
    .where(eq(users.clerkId, clerkId))
    .returning();

  const user = result[0];
  if (!user) {
    throw new HttpError(404, "User not found");
  }

  return user;
};
