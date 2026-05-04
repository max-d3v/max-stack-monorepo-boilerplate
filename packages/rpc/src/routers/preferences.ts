import {
  getOrCreatePreferences,
  updatePreferences,
} from "@workspace/core/use-cases/preferences";
import { updatePreferencesInputSchema } from "@workspace/types/use-cases/preferences";
import { authenticatedProcedure } from "../procedures";

const preferencesRouter = {
  get: authenticatedProcedure.handler(async ({ context }) => {
    const { id } = context.user;
    return await getOrCreatePreferences({ userId: id });
  }),

  update: authenticatedProcedure
    .input(updatePreferencesInputSchema)
    .handler(async ({ context, input }) => {
      const { id } = context.user;
      return await updatePreferences({ userId: id, data: input });
    }),
};

export default preferencesRouter;
