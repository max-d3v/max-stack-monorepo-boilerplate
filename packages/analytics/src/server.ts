import "server-only";
import { PostHog } from "posthog-node";
import { keys } from "./keys";
import type { Event } from "./structure/events";

const { NEXT_PUBLIC_POSTHOG_KEY, NEXT_PUBLIC_POSTHOG_HOST } = keys();

export const analytics =
  NEXT_PUBLIC_POSTHOG_KEY && NEXT_PUBLIC_POSTHOG_HOST
    ? new PostHog(NEXT_PUBLIC_POSTHOG_KEY, {
        host: NEXT_PUBLIC_POSTHOG_HOST,

        // Don't batch events and flush immediately when running serverless
        flushAt: 1,
        flushInterval: 0,
      })
    : undefined;

export const capture = (params: {
  event: Event;
  userId: string;
  details: Record<string, unknown>;
}) => {
  const { event, userId, details } = params;

  if (!analytics) {
    console.warn(
      `tried capturing event ${event} for user ${userId}, but analytics is not initialized`
    );
    return;
  }

  analytics.capture({
    event,
    distinctId: userId,
    properties: details,
  });
};
