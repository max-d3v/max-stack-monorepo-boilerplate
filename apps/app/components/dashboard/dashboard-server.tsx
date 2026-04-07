import { DashboardTasksPreview } from "./dashboard-tasks-preview";
import { DashboardStats } from "./dashboard-stats";
import { getQueryClient } from "@workspace/data-layer/hydration";
import { orpc } from "@workspace/rpc/orpc/tanstack";


export async function Dashboard() {

      const queryClient = getQueryClient();

    const tasks = await queryClient.fetchQuery(
        orpc.tasks.getUserTasks.queryOptions({
        refetchInterval: 10000,
        })
    )

    return (
        <>
            <DashboardStats tasks={tasks}/>
          <DashboardTasksPreview tasks={tasks} />
        </>
    )
}