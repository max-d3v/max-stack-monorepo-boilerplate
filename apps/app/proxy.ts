import { authMiddleware } from "@workspace/auth/proxy";

export default authMiddleware();

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
