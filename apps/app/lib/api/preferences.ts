import type {
  PreferencesResponse,
  UpdatePreferencesInput,
  UpdatePreferencesResponse,
} from "@workspace/types";
import { api } from "./client";

export async function getPreferences(): Promise<PreferencesResponse> {
  return api.get<PreferencesResponse>("/preferences");
}

export async function updatePreferences(
  updates: UpdatePreferencesInput
): Promise<UpdatePreferencesResponse> {
  return api.put<UpdatePreferencesResponse>("/preferences", updates);
}
