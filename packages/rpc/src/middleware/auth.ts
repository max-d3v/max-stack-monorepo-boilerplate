import { os } from "@orpc/server";
import { authClient } from "@workspace/auth/client";
import { HttpError } from "@workspace/types/errors/http";

// This needs clerk middleware from wherever its called.
export const authMiddleware = os
  .$context<{ userId?: string }>()
  .middleware(async ({ next }) => {
    const { data } = await authClient.getSession();
    const userId = data?.user.id;
    const sessionClaims = data?.session;

    if (!userId) {
      throw new HttpError(401, "Unauthorized");
    }

    const result = await next({
      context: {
        user: {
          id: userId,
          ...sessionClaims,
        },
      },
    });

    return result;
  });
