import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { apiService } from "../../services/apiService";
import type { SubmitQuizBody, SubmitQuizResponse } from "../../types/quiz";
import type { ApiResponse } from "@/types/api";

export const useSubmitQuiz = (quizId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SubmitQuizBody) =>
      apiService.post<ApiResponse<SubmitQuizResponse>>(`/quizzes/${quizId}/submit`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.quizzes.detail(quizId),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.quizzes.results() });
    },
  });
};
