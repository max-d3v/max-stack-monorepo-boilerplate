import { getQueryClient, HydrateClient } from "@workspace/data-layer/hydration";
import { orpc } from "@workspace/data-layer/orpc.tanstack";
import { Suspense } from "react";
import { SettingsContent } from "@/components/settings";
import { SettingsLoading } from "@/components/settings/settings-loading";

export default async function SettingsPage() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(orpc.preferences.get.queryOptions());

  return (
    <Suspense fallback={<SettingsLoading />}>
      <HydrateClient client={queryClient}>
        <SettingsContent />
      </HydrateClient>
    </Suspense>
  );
}
