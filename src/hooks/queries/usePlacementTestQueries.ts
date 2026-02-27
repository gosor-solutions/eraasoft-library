import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { apiService } from "../../services/apiService";
import type {
  GetPlacementTestResponse,
  GetPlacementTestResultsResponse,
} from "../../types/placementTest";

export const useGetPlacementTest = () => {
  return useQuery({
    queryKey: QUERY_KEYS.placementTest.base(),
    queryFn: () => apiService.get<GetPlacementTestResponse>("/placement-test"),
  });
};

export const useGetPlacementTestResults = () => {
  return useQuery({
    queryKey: QUERY_KEYS.placementTest.results(),
    queryFn: () =>
      apiService.get<GetPlacementTestResultsResponse>(
        "/placement-test-results",
      ),
  });
};
