import { getQueryClient, HydrateClient } from "@workspace/data-layer/hydration";
import { orpcServer } from "@workspace/data-layer/orpc.tanstack.server";
import { Skeleton } from "boneyard-js/react";
import { Suspense } from "react";
import { SettingsContent } from "@/components/settings";
import { SettingsLoading } from "@/components/settings/settings-loading";

export default async function SettingsPage() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(orpcServer.preferences.get.queryOptions());

  return (
    <Suspense
      fallback={
        <Skeleton fallback={<SettingsLoading />} loading={true} name="settings">
          <SettingsContent />
        </Skeleton>
      }
    >
      <HydrateClient client={queryClient}>
        <SettingsContent />
      </HydrateClient>
    </Suspense>
  );
}
