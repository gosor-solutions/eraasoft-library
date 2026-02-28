import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { apiService } from "../../services/apiService";
import type {
  GetQuizResponse,
  GetQuizResultsResponse,
  GetQuizzesResponse,
} from "../../types/quiz";
import type { ApiResponse } from "@/types/api";

export const useGetQuizzes = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: QUERY_KEYS.quizzes.list(params),
    queryFn: () => apiService.get<GetQuizzesResponse>("/quizzes", params),
  });
};

export const useGetLectureQuizzes = (lectureId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.quizzes.lecture(lectureId),
    queryFn: () =>
      apiService.get<GetQuizzesResponse>(`/quizzes/lecture/${lectureId}`),
  });
};

export const useGetQuiz = (quizId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.quizzes.detail(quizId),
    queryFn: () => apiService.get<ApiResponse<GetQuizResponse>>(`/quizzes/${quizId}`),
  });
};

export const useGetQuizResults = (
  quizId?: number,
  params?: Record<string, unknown>,
) => {
  return useQuery({
    queryKey: QUERY_KEYS.quizzes.results(quizId, params),
    queryFn: () => {
      const url = quizId ? `/quizzes/${quizId}/results` : "/quiz-results";
      return apiService.get<GetQuizResultsResponse>(url, params);
    },
  });
};
