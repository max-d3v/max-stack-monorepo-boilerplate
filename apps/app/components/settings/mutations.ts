"use client";

import type { QueryClient } from "@tanstack/react-query";
import { orpcClient } from "@workspace/data-layer/orpc.tanstack.client";
import { toast } from "sonner";

export function updatePreferences(queryClient: QueryClient) {
  return orpcClient.preferences.update.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: orpcClient.preferences.get.key(),
      });
      toast.success("Settings saved successfully!");
    },
  });
}

export function updateProfile(queryClient: QueryClient) {
  return orpcClient.users.updateProfile.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: orpcClient.users.getUser.key(),
      });
      toast.success("Profile updated successfully!");
    },
  });
}

export function deleteAccount(_queryClient: QueryClient) {
  return orpcClient.users.deleteAccount.mutationOptions({
    onSuccess: () => {
      window.location.href = "/";
    },
  });
}
