"use client";

import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useClerk } from "@workspace/auth/client";
import { orpcClient } from "@workspace/data-layer/orpc.tanstack.client";
import type { AuthUser } from "@workspace/types/use-cases/users";

export function useAuth(): { data: AuthUser; isPending: false } {
  const { data } = useSuspenseQuery(orpcClient.users.getUser.queryOptions());
  return { data, isPending: false };
}

export function useLogout() {
  const { signOut } = useClerk();

  return useMutation({
    mutationFn: () => signOut(),
  });
}
