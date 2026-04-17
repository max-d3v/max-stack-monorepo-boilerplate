"use client";

import type { QueryClient } from "@tanstack/react-query";
import { orpcClient } from "@workspace/data-layer/orpc.tanstack.client";
import { toast } from "sonner";

export function updateTask(queryClient: QueryClient) {
  return orpcClient.tasks.update.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: orpcClient.tasks.getUserTasksWithCount.key(),
      });
      toast.success("Task updated successfully!");
    },
  });
}

export function deleteTask(queryClient: QueryClient) {
  return orpcClient.tasks.delete.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: orpcClient.tasks.getUserTasksWithCount.key(),
      });
      toast.success("Task deleted successfully!");
    },
  });
}

export function createTask(queryClient: QueryClient) {
  return orpcClient.tasks.create.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: orpcClient.tasks.getUserTasksWithCount.key(),
      });
    },
  });
}
