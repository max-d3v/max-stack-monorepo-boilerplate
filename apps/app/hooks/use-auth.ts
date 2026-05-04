"use client";

import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { authClient } from "@workspace/auth/client";
import { orpc } from "@workspace/data-layer/orpc.tanstack";
import type { AuthUser } from "@workspace/types/use-cases/users";

export function useAuth(): { data: AuthUser; isPending: false } {
  const { data } = useSuspenseQuery(orpc.users.getUser.queryOptions());
  return { data, isPending: false };
}

export function useLogout() {
  const { signOut } = authClient;

  return useMutation({
    mutationFn: () => signOut(),
  });
}
