import type { SQL, SQLWrapper } from "@workspace/database/client";
import { and, db, desc, eq } from "@workspace/database/client";
import { userPreference } from "@workspace/database/schema";
import { HttpError } from "@workspace/types/errors/http";
import type {
  CreateUserPreferenceParams,
  DeleteUserPreferenceParams,
  GetUserPreferenceParams,
  JoinableParams,
  ListUserPreferencesParams,
  UpdateUserPreferenceParams,
  UserPreferenceRawObject,
  WhereClauseParams,
} from "@workspace/types/repository/user-preferences";

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE_NUM = 1;

const buildSearchClause = (_search?: string) => {
  // No searchable text fields on user_preferences
  return undefined;
};

const buildWhere = (whereables: WhereClauseParams) => {
  const { userId } = whereables;

  const whereClause: SQLWrapper[] = [];
  if (userId) {
    whereClause.push(eq(userPreference.userId, userId));
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

  return joinClause;
};

export const list = async (params: ListUserPreferencesParams) => {
  const {
    search,
    pageNum = DEFAULT_PAGE_NUM,
    pageSize = DEFAULT_PAGE_SIZE,
    include,
    ...rest
  } = params;

  const offset = (pageNum - 1) * pageSize;

  const data = await db.query.userPreference.findMany({
    where: buildWhereClause({ search, ...rest }),
    orderBy: desc(userPreference.createdAt),
    limit: pageSize,
    offset,
    with: buildJoinClause(include),
  });

  return data;
};

export const get = async (
  params: GetUserPreferenceParams
): Promise<UserPreferenceRawObject> => {
  const { userId } = params;

  const preference = await db.query.userPreference.findFirst({
    where: eq(userPreference.userId, userId),
  });

  if (!preference) {
    throw new HttpError(404, "User preferences not found");
  }

  return preference;
};

export const find = async (
  userId: string
): Promise<UserPreferenceRawObject[]> => {
  const result = await db
    .select()
    .from(userPreference)
    .where(eq(userPreference.userId, userId))
    .orderBy(desc(userPreference.createdAt))
    .limit(1);

  return result;
};

export const getOrCreate = async (
  params: GetUserPreferenceParams
): Promise<UserPreferenceRawObject> => {
  const { userId } = params;

  const existing = await db.query.userPreference.findFirst({
    where: eq(userPreference.userId, userId),
  });

  if (existing) {
    return existing;
  }

  const result = await db.insert(userPreference).values({ userId }).returning();

  const preference = result[0];
  if (!preference) {
    throw new HttpError(500, "Failed to create user preferences");
  }

  return preference;
};

export const create = async (
  params: CreateUserPreferenceParams
): Promise<UserPreferenceRawObject> => {
  const result = await db.insert(userPreference).values(params).returning();

  const preference = result[0];
  if (!preference) {
    throw new HttpError(500, "Failed to create user preferences");
  }

  return preference;
};

export const updateOne = async (
  params: UpdateUserPreferenceParams
): Promise<UserPreferenceRawObject> => {
  const { userId, ...data } = params;

  const result = await db
    .update(userPreference)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(userPreference.userId, userId))
    .returning();

  const preference = result[0];
  if (!preference) {
    throw new HttpError(404, "User preferences not found");
  }

  return preference;
};

export const deleteOne = async (
  params: DeleteUserPreferenceParams
): Promise<UserPreferenceRawObject> => {
  const { userId } = params;

  const result = await db
    .delete(userPreference)
    .where(eq(userPreference.userId, userId))
    .returning();

  const preference = result[0];
  if (!preference) {
    throw new HttpError(404, "User preferences not found");
  }

  return preference;
};

export const deleteAllByUserId = async (params: {
  userId: string;
}): Promise<void> => {
  const { userId } = params;
  await db.delete(userPreference).where(eq(userPreference.userId, userId));
};
