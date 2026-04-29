import type { SQL, SQLWrapper } from "@workspace/database/client";
import { and, db, desc, eq, ilike, or } from "@workspace/database/client";
import { tasks, tenants } from "@workspace/database/schema";
import { HttpError } from "@workspace/types/errors/http";
import type {
  CreateTaskParams,
  DeleteTaskParams,
  GetTaskParams,
  ListTasksParams,
  TaskRawObject,
  UpdateTaskParams,
  WhereClauseParams,
  JoinableParams,
} from "@workspace/types/repository/tasks";

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE_NUM = 1;

const buildSearchClause = (search?: string) => {
  if (!search) {
    return undefined;
  }
  return or(
    ilike(tasks.title, `%${search}%`),
    ilike(tasks.description, `%${search}%`)
  );
};

const buildWhere = (whereables: WhereClauseParams) => {
  const { userId, tenantId } = whereables;

  const whereClause: SQLWrapper[] = [];
  if (userId) {
    whereClause.push(eq(tasks.userId, userId));
  }
  if (tenantId) {
    whereClause.push(eq(tenants.id, tenantId));
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
  if (include?.tenants) {
    joinClause.tenants = true;
  }

  return joinClause;
};

export const list = async (params: ListTasksParams) => {
  const {
    search,
    pageNum = DEFAULT_PAGE_NUM,
    pageSize = DEFAULT_PAGE_SIZE,
    include,
    ...rest
  } = params;

  const offset = (pageNum - 1) * pageSize;

  const data = await db.query.tasks.findMany({
    where: buildWhereClause({ search, ...rest }),
    orderBy: desc(tasks.createdAt),
    limit: pageSize,
    offset,
    with: buildJoinClause(include),
  });

  return data;
};

export const get = async (params: GetTaskParams): Promise<TaskRawObject> => {
  const { id } = params;

  const task = await db.query.tasks.findFirst({
    where: eq(tasks.id, id),
  });

  if (!task) {
    throw new HttpError(404, "Task not found");
  }

  return task;
};

export const find = async (userId: string): Promise<TaskRawObject[]> => {
  const result = await db
    .select()
    .from(tasks)
    .where(eq(tasks.userId, userId))
    .orderBy(desc(tasks.createdAt))
    .limit(1);

  return result;
};

export const create = async (
  params: CreateTaskParams
): Promise<TaskRawObject> => {
  const { userId, ...data } = params;

  const result = await db
    .insert(tasks)
    .values({ ...data, userId })
    .returning();

  const task = result[0];
  if (!task) {
    throw new HttpError(500, "Failed to create task");
  }

  return task;
};

export const updateOne = async (
  params: UpdateTaskParams
): Promise<TaskRawObject> => {
  const { id, userId, ...data } = params;

  const result = await db
    .update(tasks)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(tasks.id, id), eq(tasks.userId, userId)))
    .returning();

  const task = result[0];
  if (!task) {
    throw new HttpError(404, "Task not found");
  }

  return task;
};

export const deleteOne = async (
  params: DeleteTaskParams
): Promise<TaskRawObject> => {
  const { id, userId } = params;

  const result = await db
    .delete(tasks)
    .where(and(eq(tasks.id, id), eq(tasks.userId, userId)))
    .returning();

  const task = result[0];
  if (!task) {
    throw new HttpError(404, "Task not found");
  }

  return task;
};

export const deleteAllByUserId = async (params: {
  userId: string;
}): Promise<void> => {
  const { userId } = params;
  await db.delete(tasks).where(eq(tasks.userId, userId));
};
