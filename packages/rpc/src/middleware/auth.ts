import { auth } from "@workspace/auth/auth";
import { HttpError } from "@workspace/types/errors/http";
import { base } from "../base";
//import { getSessionCookie } from "better-auth/cookies";

export const authMiddleware = base.middleware(async ({ context, next }) => {
  //console.log(context)
  const data = await auth.api.getSession({
    headers: context.headers,
  });

  const user = data?.user;
  const sessionClaims = data?.session;

  if (!user) {
    throw new HttpError(401, "Unauthorized");
  }

  const result = await next({
    context: {
      user,
      sessionClaims,
    },
  });

  return result;
});
