import { ENV } from "./env";

/**
 * Robust Logging Utility for API Requests/Responses
 * Controlled via NEXT_PUBLIC_ENABLE_API_LOGGING
 */

const formatHeader = (key: string, value: string | null) => {
  if (key.toLowerCase() === "authorization") {
    return value ? `${value.substring(0, 15)}... (hidden)` : "none";
  }
  return value;
};

export const logger = {
  logRequest: (url: string, options: RequestInit) => {
    if (!ENV.ENABLE_API_LOGGING) return;

    const timestamp = new Date().toLocaleTimeString();
    console.group(`🚀 API Request | ${options.method || "GET"} | ${timestamp}`);
    console.log(`URL: ${url}`);

    if (options.headers) {
      const sanitizedHeaders: Record<string, string> = {};
      Object.entries(options.headers as Record<string, string>).forEach(
        ([k, v]) => {
          sanitizedHeaders[k] = formatHeader(k, v) || "";
        },
      );
      console.log("Headers:", sanitizedHeaders);
    }

    if (options.body) {
      try {
        console.log("Body:", JSON.parse(options.body as string));
      } catch {
        console.log("Body:", options.body);
      }
    }
    console.groupEnd();
  },

  logResponse: (
    url: string,
    response: Response,
    duration: number,
    data: unknown,
  ) => {
    if (!ENV.ENABLE_API_LOGGING) return;

    const statusIcon = response.ok ? "✅" : "⚠️";
    console.group(
      `${statusIcon} API Response | ${response.status} | ${duration}ms`,
    );
    console.log(`URL: ${url}`);
    console.log("Data:", data);
    console.groupEnd();
  },

  logError: (url: string, error: unknown, duration?: number) => {
    if (!ENV.ENABLE_API_LOGGING) return;

    console.group(`❌ API Error | ${url}`);
    if (duration) console.log(`Duration: ${duration}ms`);
    console.log("Error Detail:", error);
    console.groupEnd();
  },
};
