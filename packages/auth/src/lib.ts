export const isGoogleAuthProvided = !!(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
);
