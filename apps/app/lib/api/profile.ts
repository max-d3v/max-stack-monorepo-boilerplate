import type {
  DeleteAccountResponse,
  UpdateProfileInput,
  UpdateProfileResponse,
} from "@workspace/types/use-cases/account";
import { api } from "./client";

export const updateProfile = async (
  data: UpdateProfileInput
): Promise<UpdateProfileResponse> => {
  return api.put<UpdateProfileResponse>("/account/profile", data);
};

export const deleteAccount = async (): Promise<DeleteAccountResponse> => {
  return api.delete<DeleteAccountResponse>("/account/delete");
};
