import { os } from "@orpc/server";
import { getUserTasksWithCount } from "@workspace/core/use-cases/tasks";
import { getUserTasksInputSchema } from "@workspace/types/use-cases";

const tasksRouter = {
  getUserTasksWithCount: os
    .input(getUserTasksInputSchema)
    .handler(async ({ input }) => {
      const { userId } = input;
      const { tasks, taskCounts } = await getUserTasksWithCount(userId);
      return { tasks, taskCounts };
    }),
};

export default tasksRouter;
