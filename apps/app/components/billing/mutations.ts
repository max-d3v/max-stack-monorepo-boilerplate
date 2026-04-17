"use client";

import type { QueryClient } from "@tanstack/react-query";
import { orpcClient } from "@workspace/data-layer/orpc.tanstack.client";
import { toast } from "sonner";

export function cancelSubscription(queryClient: QueryClient) {
  return orpcClient.billing.cancelSubscription.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: orpcClient.billing.getSubscription.key(),
      });
      toast.success(
        "Subscription canceled. It will end at the end of the billing period."
      );
    },
  });
}
