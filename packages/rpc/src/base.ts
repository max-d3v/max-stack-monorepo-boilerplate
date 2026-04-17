import { os } from "@orpc/server";
import { authMiddleware } from "./middleware/auth";
import { zodErrorLoggerMiddleware } from "./middleware/zod-error";

// `zodErrorLoggerMiddleware` must be attached before any `.input(schema)` call
// so it wraps around oRPC's input validation step and can catch its errors.
export const publicProcedure = os.use(zodErrorLoggerMiddleware);

export const authenticatedProcedure = publicProcedure.use(authMiddleware);

export const webhookProcedure = publicProcedure;
