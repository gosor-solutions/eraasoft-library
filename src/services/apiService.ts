import { api } from "@/lib/api";

export const apiService = {
  get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    return api.get<T>(url, { params }).then((r) => r.data);
  },

  post<T>(url: string, data?: unknown): Promise<T> {
    return api.post<T>(url, data).then((r) => r.data);
  },

  put<T>(url: string, data?: unknown): Promise<T> {
    return api.put<T>(url, data).then((r) => r.data);
  },

  patch<T>(url: string, data?: unknown): Promise<T> {
    return api.patch<T>(url, data).then((r) => r.data);
  },

  delete<T>(url: string): Promise<T> {
    return api.delete<T>(url).then((r) => r.data);
  },
};
