"use client";

import { api } from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { APIResponse } from "../types";
import { Course } from "../types/course";

/**
 * Client-side hooks for Courses using TanStack Query
 */
export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: () => api.get<APIResponse<Course[]>>("/courses"),
  });
};

export const useCourse = (id: string, initialData?: APIResponse<Course>) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => api.get<APIResponse<Course>>(`/courses/${id}`),
    initialData,
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Course>) =>
      api.post<APIResponse<Course>>("/courses", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};
