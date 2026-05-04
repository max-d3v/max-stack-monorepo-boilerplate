import { auth } from "@workspace/auth/auth";
import { toNextJsHandler } from "@workspace/auth/server";

export const { GET, POST } = toNextJsHandler(auth);
