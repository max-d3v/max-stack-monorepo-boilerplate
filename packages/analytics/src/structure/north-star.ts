import { EVENTS } from "./events";
export const NORTH_STAR_METRICS = {
  task_completed: {
    events: [EVENTS.user_created, EVENTS.task_created, EVENTS.task_completed],
  },
};
