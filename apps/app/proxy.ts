export { default as proxy } from "@workspace/auth/proxy";

export const config = {
  matcher: ["/((?!api|auth|_next/static|_next/image|favicon.ico).*)"],
};
