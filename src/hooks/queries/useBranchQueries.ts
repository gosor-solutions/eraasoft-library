import { QUERY_KEYS } from "@/constants/queryKeys";
import { apiService } from "@/services/apiService";
import type { ApiResponse } from "@/types/api";
import type { Branch } from "@/types/branch";
import { useQuery } from "@tanstack/react-query";

export const useGetBranches = () => {
  return useQuery({
    queryKey: QUERY_KEYS.branches.all(),
    queryFn: () => apiService.get<ApiResponse<Branch[]>>("/branches").then((res) => res.data),
  });
};
