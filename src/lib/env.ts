// TODO: use zod to parse env variables, don't build or run dev unless the parse passes

export const ENV = {
  AUTH_COOKIE_NAME: process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME || "auth_token",
  OTP_STORAGE_KEY: process.env.NEXT_PUBLIC_OTP_STORAGE_KEY || "otp_pending",
  DEV_AUTH_BYPASS: process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === "true",
  API_BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api",
  ENABLE_API_LOGGING: process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === "true",
} as const;
