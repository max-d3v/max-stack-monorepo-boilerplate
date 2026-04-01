import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAccount, updateProfile } from "@/lib/api/profile";
import { showErrorToast, showSuccessToast } from "@/lib/errors";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ["user"] });
      showSuccessToast("Profile updated successfully");
    },
    onError: (error) => {
      showErrorToast(error);
    },
  });
}

export function useDeleteAccount() {
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      // Clear all cached data and redirect to home
      window.location.href = "/";
    },
    onError: (error) => {
      showErrorToast(error);
    },
  });
}
