import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clearAuthToken, setAuthToken } from "@workspace/auth/client";
import type { AuthResponse } from "@workspace/types";
import { useRouter } from "next/navigation";
import { getAuthUser, login, logout, register } from "@/lib/api/auth";

export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
};

export const useAuth = () => {
  return useQuery<AuthResponse>({
    queryKey: authKeys.user(),
    queryFn: getAuthUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuthToken(data.token);
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
      router.push("/dashboard");
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      setAuthToken(data.token);
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
      router.push("/dashboard");
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuthToken();
      queryClient.setQueryData(authKeys.user(), { user: null });
      queryClient.removeQueries({ queryKey: authKeys.all });
      router.push("/");
    },
  });
};
