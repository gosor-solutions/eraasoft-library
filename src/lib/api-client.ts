import { getAuthToken } from "./auth"; // Server-side
import { getAuthTokenClient } from "./clientAuth"; // Client-side
import { ENV } from "./env";
import { logger } from "./logger";

type FetchOptions = RequestInit & {
  params?: Record<string, string | number | boolean>;
};

class APIError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, data: unknown, message?: string) {
    super(message || `API Error: ${status}`);
    this.status = status;
    this.data = data;
    this.name = "APIError";
  }
}

async function request<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const isServer = typeof window === "undefined";
  const { params, ...fetchOptions } = options;

  // 1. Build URL
  let url = endpoint.startsWith("http")
    ? endpoint
    : `${ENV.API_BASE_URL}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    url += `?${searchParams.toString()}`;
  }

  // 2. Prepare Headers
  const headers = new Headers(fetchOptions.headers);
  if (
    !headers.has("Content-Type") &&
    !(fetchOptions.body instanceof FormData)
  ) {
    headers.set("Content-Type", "application/json");
  }

  // 3. Attach Auth Token
  const token = isServer ? await getAuthToken() : getAuthTokenClient();
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // 4. Execute Fetch
  const startTime = Date.now();
  const finalOptions = { ...fetchOptions, headers };

  logger.logRequest(url, finalOptions);

  try {
    const response = await fetch(url, finalOptions);
    const duration = Date.now() - startTime;

    let data;
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      logger.logError(url, data, duration);
      throw new APIError(response.status, data);
    }

    logger.logResponse(url, response, duration, data);
    return data as T;
  } catch (error) {
    // if (error instanceof APIError) throw error;
    const duration = Date.now() - startTime;
    logger.logError(url, error, duration);
    throw error;
  }
}

export const api = {
  get: <T>(url: string, options?: FetchOptions) =>
    request<T>(url, { ...options, method: "GET" }),

  post: <T>(url: string, body?: unknown, options?: FetchOptions) =>
    request<T>(url, {
      ...options,
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  put: <T>(url: string, body?: unknown, options?: FetchOptions) =>
    request<T>(url, {
      ...options,
      method: "PUT",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  patch: <T>(url: string, body?: unknown, options?: FetchOptions) =>
    request<T>(url, {
      ...options,
      method: "PATCH",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  delete: <T>(url: string, options?: FetchOptions) =>
    request<T>(url, { ...options, method: "DELETE" }),
};
