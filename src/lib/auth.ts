import { cookies } from "next/headers";
import { ENV } from "./env";

// --- Server-Side Auth Utilities (for Server Components, Actions, Middleware) ---

export const getAuthToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(ENV.AUTH_COOKIE_NAME)?.value;
};

export const isAuthenticated = async () => {
  if (ENV.DEV_AUTH_BYPASS) return true;
  const token = await getAuthToken();
  return !!token;
};
