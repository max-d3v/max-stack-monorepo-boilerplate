import { EVENTS } from "./events";

export const RETENTION_METRICS = {
  basic_retention: {
    baselineEvent: EVENTS.user_created,
    retentionEvent: EVENTS.user_pageview,
    timeframe: "daily",
  },
};
