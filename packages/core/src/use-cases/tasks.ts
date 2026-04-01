import * as taskRepo from "@workspace/repository/tasks";
import type { TaskRawObject } from "@workspace/types/repository/tasks";
import type { GetUserTasksWithCountInput } from "@workspace/types/tasks";

const countTasksByStatus = (tasks: TaskRawObject[]) => ({
  completed: tasks.filter((t) => t.status === "completed").length,
  inProgress: tasks.filter((t) => t.status === "in-progress").length,
  todo: tasks.filter((t) => t.status === "todo").length,
});

export const getUserTasksWithCount = async (
  params: GetUserTasksWithCountInput
) => {
  const { userId } = params;
  const tasks = await taskRepo.find(userId);
  const taskCounts = countTasksByStatus(tasks);
  return { tasks, taskCounts };
};
