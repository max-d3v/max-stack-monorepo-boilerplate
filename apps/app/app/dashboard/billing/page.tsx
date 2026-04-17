import { getQueryClient, HydrateClient } from "@workspace/data-layer/hydration";
import { orpcServer } from "@workspace/data-layer/orpc.tanstack.server";
import { Skeleton } from "boneyard-js/react";
import { Suspense } from "react";
import { BillingContent } from "@/components/billing";

const BILLING_REFETCH_INTERVAL = 30_000;

export default async function BillingPage() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    orpcServer.billing.getSubscription.queryOptions({
      refetchInterval: BILLING_REFETCH_INTERVAL,
    })
  );

  return (
    <Suspense
      fallback={
        <Skeleton loading={true} name="billing">
          <BillingContent />
        </Skeleton>
      }
    >
      <HydrateClient client={queryClient}>
        <BillingContent />
      </HydrateClient>
    </Suspense>
  );
}
