import { z } from "zod";

export const getUserTasksWithCountInputSchema = z.object({
  userId: z.string().uuid(),
});

export type GetUserTasksWithCountInput = z.infer<
  typeof getUserTasksWithCountInputSchema
>;
