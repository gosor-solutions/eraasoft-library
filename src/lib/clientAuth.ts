import Cookies from "js-cookie";
import { ENV } from "./env";

// --- Client-Side Auth Utilities (for Client Components) ---

export const getAuthTokenClient = () => {
  return Cookies.get(ENV.AUTH_COOKIE_NAME);
};

export const isAuthenticatedClient = () => {
  return !!getAuthTokenClient();
};

export const clearAuthToken = () => {
  Cookies.remove(ENV.AUTH_COOKIE_NAME);
  // Important: Also remove any other session/local storage if needed
};

// --- OTP Flow Management (Client-Side) ---

export const setOTPPending = () => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(ENV.OTP_STORAGE_KEY, "true");
  }
};

export const isOTPPending = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(ENV.OTP_STORAGE_KEY) === "true";
  }
  return false;
};

export const clearOTPPending = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(ENV.OTP_STORAGE_KEY);
  }
};
