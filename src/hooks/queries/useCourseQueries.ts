import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { apiService } from "../../services/apiService";
import type {
  GetCourseResponse,
  GetCoursesResponse,
  GetUserSessionsResponse,
} from "../../types/course";

export const useGetCourses = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: QUERY_KEYS.courses.list(params),
    queryFn: () => apiService.get<GetCoursesResponse>("/student/courses", params),
  });
};

export const useGetCourse = (courseId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.courses.detail(courseId),
    queryFn: () => apiService.get<GetCourseResponse>(`/student/courses/${courseId}`),
  });
};

export const useGetUserSessions = (courseId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.courses.userSessions(courseId),
    queryFn: () =>
      apiService.get<GetUserSessionsResponse>(
        `/student/courses/${courseId}/user-sessions`,
      ),
  });
};
