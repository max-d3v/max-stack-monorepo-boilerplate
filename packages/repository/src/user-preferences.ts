import { db, eq, userPreferences } from "@workspace/database";
import { HttpError } from "@workspace/types/errors/http";
import type {
  CreateUserPreferenceParams,
  DeleteUserPreferenceParams,
  GetUserPreferenceParams,
  UpdateUserPreferenceParams,
  UserPreferenceRawObject,
} from "@workspace/types/repository/user-preferences";

export const get = async (
  params: GetUserPreferenceParams
): Promise<UserPreferenceRawObject> => {
  const { userId } = params;

  const preference = await db.query.userPreferences.findFirst({
    where: eq(userPreferences.userId, userId),
  });

  if (!preference) {
    throw new HttpError(404, "User preferences not found");
  }

  return preference;
};

export const getOrCreate = async (
  params: GetUserPreferenceParams
): Promise<UserPreferenceRawObject> => {
  const { userId } = params;

  const existing = await db.query.userPreferences.findFirst({
    where: eq(userPreferences.userId, userId),
  });

  if (existing) {
    return existing;
  }

  const result = await db
    .insert(userPreferences)
    .values({ userId })
    .returning();

  const preference = result[0];
  if (!preference) {
    throw new HttpError(500, "Failed to create user preferences");
  }

  return preference;
};

export const create = async (
  params: CreateUserPreferenceParams
): Promise<UserPreferenceRawObject> => {
  const result = await db.insert(userPreferences).values(params).returning();

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
    .update(userPreferences)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(userPreferences.userId, userId))
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
    .delete(userPreferences)
    .where(eq(userPreferences.userId, userId))
    .returning();

  const preference = result[0];
  if (!preference) {
    throw new HttpError(404, "User preferences not found");
  }

  return preference;
};
