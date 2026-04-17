import { getQueryClient } from "@workspace/data-layer/hydration";
import { orpcServer } from "@workspace/data-layer/orpc.tanstack.server";
import { DashboardStats } from "./dashboard-stats";
import { DashboardTasksPreview } from "./dashboard-tasks-preview";

export async function Dashboard() {
  const queryClient = getQueryClient();

  const DASHBOARD_REFETCH_INTERVAL = 10_000;

  const tasks = await queryClient.fetchQuery(
    orpcServer.tasks.getUserTasks.queryOptions({
      refetchInterval: DASHBOARD_REFETCH_INTERVAL,
    })
  );

  return (
    <>
      <DashboardStats tasks={tasks} />
      <DashboardTasksPreview tasks={tasks} />
    </>
  );
}
