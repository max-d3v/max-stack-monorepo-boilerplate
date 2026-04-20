import { getQueryClient } from "@workspace/data-layer/hydration";
import { orpc } from "@workspace/data-layer/orpc.tanstack";
import { Suspense } from "react";
import { DashboardLoading } from "@/components/dashboard/dashboard-loading";
import { Dashboard } from "@/components/dashboard/dashboard-server";
import { DashboardWelcome } from "@/components/dashboard/dashboard-welcome";

const DASHBOARD_REFETCH_INTERVAL = 10_000;

export default async function Page() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    orpc.tasks.getUserTasks.queryOptions({
      refetchInterval: DASHBOARD_REFETCH_INTERVAL,
    })
  );

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <DashboardWelcome />
      <Suspense fallback={<DashboardLoading />}>
        <Dashboard />
      </Suspense>
    </div>
  );
}
