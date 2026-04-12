import type { ApiResponse } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { apiService } from "../../services/apiService";
import type {
  CheckCouponBody,
  CheckCouponResponse,
  EnrollBody,
  EnrollResponse,
} from "../../types/courseEnrollment";

export const useEnrollCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EnrollBody) =>
      apiService.post<ApiResponse<EnrollResponse>>(
        "/course-enrollment/enroll",
        data,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.learning.all() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.courses.all() });
    },
  });
};

export const useCheckCoupon = () => {
  return useMutation({
    mutationFn: (data: CheckCouponBody) =>
      apiService.post<ApiResponse<CheckCouponResponse>>(
        "/course-enrollment/check-coupon",
        data,
      ),
  });
};
