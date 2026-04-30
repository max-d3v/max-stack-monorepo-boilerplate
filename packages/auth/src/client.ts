import { createAuthClient } from "better-auth/react";
import { keys } from "./keys";

export const authClient = createAuthClient({
  baseURL: keys().BETTER_AUTH_URL,
});
