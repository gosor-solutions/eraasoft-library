import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { apiService } from "../../services/apiService";
import type { Paginated } from "../../types/api";
import type {
  PlacementTestSettingsResponse,
  PlacementTestResultResource,
} from "../../types/placementTest";

export const useGetPlacementTest = () => {
  return useQuery({
    queryKey: QUERY_KEYS.placementTest.base(),
    queryFn: () => apiService.get<PlacementTestSettingsResponse>("/placement-test"),
  });
};

export const useGetPlacementTestResults = () => {
  return useQuery({
    queryKey: QUERY_KEYS.placementTest.results(),
    queryFn: () =>
      apiService.get<Paginated<PlacementTestResultResource>>(
        "/placement-test-results",
      ),
  });
};
