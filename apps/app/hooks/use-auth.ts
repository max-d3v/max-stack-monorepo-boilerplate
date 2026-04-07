"use client";

import { useClerk, useUser } from "@workspace/auth/client";
import { useMutation } from "@tanstack/react-query";
import type { ApiResponse } from "@workspace/types/billing";
import type { AuthUser } from "@workspace/types/use-cases/account";

export function useAuth(): {
  data: ApiResponse<AuthUser> | undefined;
  isPending: boolean;
} {
  const { user, isLoaded } = useUser();

  const authUser: AuthUser | null = user
    ? {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress ?? "",
        name: user.fullName,
        image: user.imageUrl ?? null,
        emailVerified:
          user.primaryEmailAddress?.verification?.status === "verified",
      }
    : null;

  const data: ApiResponse<AuthUser> | undefined = authUser
    ? { success: true, data: authUser, message: "" }
    : undefined;

  return { data, isPending: !isLoaded };
}

export function useLogout() {
  const { signOut } = useClerk();

  return useMutation({
    mutationFn: () => signOut(),
  });
}
