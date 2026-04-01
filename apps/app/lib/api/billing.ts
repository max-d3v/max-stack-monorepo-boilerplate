import type {
  ApiResponse,
  CreateCheckoutSessionResponse,
  CreatePortalSessionResponse,
  SubscriptionResponse,
} from "@workspace/types";
import { api } from "./client";

export async function getSubscription(): Promise<SubscriptionResponse> {
  return api.get<SubscriptionResponse>("/subscription");
}

export async function createCheckout(
  priceId: string
): Promise<CreateCheckoutSessionResponse> {
  return api.post<CreateCheckoutSessionResponse>("/checkout", { priceId });
}

export async function cancelSubscription(): Promise<ApiResponse<never>> {
  return api.delete<ApiResponse<never>>("/subscription");
}

export async function createBillingPortal(): Promise<CreatePortalSessionResponse> {
  return api.post<CreatePortalSessionResponse>("/billing-portal");
}
