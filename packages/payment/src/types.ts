import type Stripe from "stripe";

export interface StripeSubscription {
  readonly cancelAtPeriodEnd: boolean;
  readonly currentPeriodEnd: Date;
  readonly customerId: string;
  readonly id: string;
  readonly plan: "free" | "pro" | "enterprise";
  readonly priceId: string;
  readonly status: Stripe.Subscription.Status;
}

export interface CheckoutSession {
  readonly sessionId: string;
  readonly url: string;
}

export interface SubscriptionData {
  readonly plan: string;
  readonly subscription: StripeSubscription | null;
}

export interface PortalSession {
  readonly url: string;
}

export type SubscriptionStatus =
  | "active"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "past_due"
  | "trialing"
  | "unpaid";

export interface PricingCardProps {
  readonly current?: boolean;
  readonly loading?: boolean;
  readonly onSelect?: (priceId: string) => void | Promise<void>;
  readonly plan: import("./config").PricingPlan;
}

export interface SubscriptionBadgeProps {
  readonly status: string;
}
