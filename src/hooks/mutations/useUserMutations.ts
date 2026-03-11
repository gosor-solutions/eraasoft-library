import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { apiService } from "../../services/apiService";
import type {
  UpdateUserRequest,
  UpdateUserPhoneRequest,
  UserResource,
} from "../../types/user";

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateUserRequest) =>
      apiService.put<UserResource>("/user/profile", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.userProfile.all(),
      });
    },
  });
};

export const useUpdateUserPhone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateUserPhoneRequest) =>
      apiService.put<UserResource>("/user/profileUpdatePhone", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.userProfile.all(),
      });
    },
  });
};
