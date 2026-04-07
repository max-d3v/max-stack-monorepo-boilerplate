"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { orpc } from "@workspace/data-layer/orpc-tanstack-util";
import { DashboardStats } from "./dashboard-stats";
import { DashboardTasksPreview } from "./dashboard-tasks-preview";
import { DashboardWelcome } from "./dashboard-welcome";

export function DashboardContent() {
  const { data: tasks } = useSuspenseQuery(orpc.tasks.getUserTasks.queryOptions());

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <DashboardWelcome />

      {tasks && (
        <>
          <DashboardStats tasks={tasks} />

          <DashboardTasksPreview tasks={tasks} />
        </>
      )}
    </div>
  );
}
