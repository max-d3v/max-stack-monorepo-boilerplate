import { base } from "./base";
import { authMiddleware } from "./middleware/auth";

export const publicProcedure = base;

export const authenticatedProcedure = publicProcedure.use(authMiddleware);
