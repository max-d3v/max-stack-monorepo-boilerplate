import { HttpError } from "@workspace/types/errors/http";
import type { TaskRawObject } from "@workspace/types/repository/tasks";

export const assertTaskOwnership = (
  task: TaskRawObject,
  userId: string
): void => {
  if (task.userId !== userId) {
    throw new HttpError(403, "Forbidden");
  }
};
