import { api } from "@/lib/api-client";
import { APIResponse } from "../types";
import { Course } from "../types/course";

/**
 * Server-side actions/fetchers for Courses
 */
export const courseServer = {
  getAll: () => api.get<APIResponse<Course[]>>("/courses"),

  // getById: (id: string) => api.get<APIResponse<Course>>(`/courses/${id}`),
};
