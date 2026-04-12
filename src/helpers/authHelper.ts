import Cookies from "js-cookie";

const AUTH_KEY = "auth_token";

export const authHelper = {
  setAuth: (token: string, options?: Cookies.CookieAttributes) => {
    Cookies.set(AUTH_KEY, token, {
      secure: true,
      sameSite: "strict",
      ...options,
    });
  },

  getAuth: (): string | undefined => {
    return Cookies.get(AUTH_KEY);
  },

  revokeAuth: () => {
    Cookies.remove(AUTH_KEY);
    window.location.href = "/";
  },

  isAuthenticated: (): boolean => {
    return !!Cookies.get(AUTH_KEY);
  },
};
