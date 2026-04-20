import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { apiService } from "../../services/apiService";
import type {
  GetFreeMaterialsResponse,
  GetTopicCoursesResponse,
  GetTopicsResponse,
} from "../../types/topic";
import type { ApiResponse } from "@/types/api";

export const useGetTopics = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: QUERY_KEYS.topics.all(params?.type),
    queryFn: () => apiService.get<ApiResponse<GetTopicsResponse>>("/topics", params),
  });
};

export const useGetTopicCourses = (topicId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.topics.courses(topicId),
    queryFn: () =>
      apiService.get<ApiResponse<GetTopicCoursesResponse>>(`/topics/${topicId}/courses`),
  });
};

export const useGetFreeMaterials = () => {
  return useQuery({
    queryKey: QUERY_KEYS.freeMaterials.all(),
    queryFn: () => apiService.get<ApiResponse<GetFreeMaterialsResponse>>("/free-materials"),
  });
};
