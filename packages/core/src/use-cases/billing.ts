import {
  cancelSubscription,
  createBillingPortalSession,
  createCheckoutSession,
  getSubscription,
} from "@workspace/payment/server";
import {
  getOrCreate,
  updateOne,
} from "@workspace/repository/entities/user-preferences";
import type {
  CancelUserSubscription,
  CreateUserBillingPortalSession,
  CreateUserCheckoutSession,
  GetSubscriptionStatus,
} from "@workspace/types/use-cases/billing";
import {
  assertHasStripeCustomer,
  assertHasSubscription,
} from "../authorization/billing";

export const getSubscriptionStatus = async (params: GetSubscriptionStatus) => {
  const { userId } = params;

  const preferences = await getOrCreate({ userId });

  if (!preferences.stripeSubscriptionId) {
    return { subscription: null, plan: "free" };
  }

  const subscription = await getSubscription(preferences.stripeSubscriptionId);

  if (!subscription) {
    return { subscription: null, plan: preferences.plan ?? "free" };
  }

  return { subscription, plan: subscription.plan };
};

export const cancelUserSubscription = async (
  params: CancelUserSubscription
) => {
  const { userId } = params;

  const preferences = await getOrCreate({ userId });
  assertHasSubscription(preferences);

  await cancelSubscription(preferences.stripeSubscriptionId as string);

  await updateOne({
    userId,
    stripeSubscriptionStatus: "canceled",
  });

  return { deleted: true };
};

export const createUserCheckoutSession = async (
  params: CreateUserCheckoutSession
) => {
  const { userId, email, priceId, successUrl, cancelUrl } = params;

  const session = await createCheckoutSession(userId, email, priceId, {
    successUrl,
    cancelUrl,
  });

  return { url: session.url ?? "", sessionId: session.id };
};

export const createUserBillingPortalSession = async (
  params: CreateUserBillingPortalSession
) => {
  const { userId } = params;

  const preferences = await getOrCreate({ userId });
  assertHasStripeCustomer(preferences);

  const session = await createBillingPortalSession(
    preferences.stripeCustomerId as string
  );

  return { url: session.url };
};
