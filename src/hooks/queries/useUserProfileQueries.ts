import type { ApiResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { apiService } from "../../services/apiService";
import type { UserResource } from "../../types/user";

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: QUERY_KEYS.userProfile.all(),
    queryFn: () => apiService.get<ApiResponse<UserResource>>("/user/profile"),
  });
};
