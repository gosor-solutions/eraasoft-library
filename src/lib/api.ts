import { authHelper } from "@/helpers/authHelper";
import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { logger } from "./logger";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ── Request interceptor ──────────────────────────────────────────────────────
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = authHelper.getAuth();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  logger.info(
    `→ ${config.method?.toUpperCase()} ${config.url}`,
    config.params ?? "",
  );
  return config;
});

// ── Response interceptor ─────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => {
    logger.info(`← ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    logger.error(`← ${status} ${error.config?.url}`, error.response?.data);

    if (status === 401) {
      authHelper.revokeAuth();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
