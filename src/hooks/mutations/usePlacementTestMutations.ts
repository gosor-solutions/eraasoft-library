import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { apiService } from "../../services/apiService";
import type {
  CheckAnswersRequest,
  LevelResults,
} from "../../types/placementTest";

export const useSubmitPlacementTest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CheckAnswersRequest) =>
      apiService.post<LevelResults>("/placement-test", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.placementTest.results(),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.home.all() });
    },
  });
};
