import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UpdatePreferencesInput, UserPreference } from "@workspace/types/use-cases/preferences";
import { getPreferences, updatePreferences } from "@/lib/api/preferences";
import { showErrorToast, showSuccessToast } from "@/lib/errors";

export const preferencesKeys = {
  all: ["preferences"] as const,
  detail: () => [...preferencesKeys.all, "detail"] as const,
};

export function usePreferences() {
  return useQuery<{ success: boolean; data: UserPreference }>({
    queryKey: preferencesKeys.detail(),
    queryFn: getPreferences,
  });
}

export function useUpdatePreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: UpdatePreferencesInput) => updatePreferences(updates),
    onSuccess: (response) => {
      showSuccessToast("Settings saved", response.message);

      queryClient.setQueryData(preferencesKeys.detail(), {
        success: true,
        data: response.data,
      });

      queryClient.invalidateQueries({ queryKey: preferencesKeys.detail() });
    },
    onError: (error) => {
      showErrorToast(error, "Failed to save settings");
    },
  });
}
