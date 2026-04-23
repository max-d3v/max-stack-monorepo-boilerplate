import {
  getOrCreate,
  updateOne,
} from "@workspace/repository/entities/user-preferences";
import type {
  GetOrCreatePreferences,
  UpdatePreferences,
} from "@workspace/types/use-cases/preferences";

export const getOrCreatePreferences = async (
  params: GetOrCreatePreferences
) => {
  const { userId } = params;
  return await getOrCreate({ userId });
};

export const updatePreferences = async (params: UpdatePreferences) => {
  const { userId, data } = params;

  await getOrCreate({ userId });

  return updateOne({ userId, ...data });
};
