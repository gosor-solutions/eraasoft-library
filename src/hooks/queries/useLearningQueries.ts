import type { ApiResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { apiService } from "../../services/apiService";
import type {
  GetEnrolledRoundResponse,
  GetLearningResponse,
} from "../../types/learning";

export const useGetLearning = () => {
  return useQuery({
    queryKey: QUERY_KEYS.learning.all(),
    queryFn: () =>
      apiService.get<ApiResponse<GetLearningResponse>>("/student/enrollments"),
  });
};

export const useGetEnrolledRound = (roundId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.learning.enrolledRound(roundId),
    queryFn: () =>
      apiService.get<ApiResponse<GetEnrolledRoundResponse>>(
        `/student/enrollments/rounds/${roundId}/details`,
      ),
  });
};

// export const useGetEnrolledCourse = (courseId: number) => {
//   return useQuery({
//     queryKey: QUERY_KEYS.learning.enrolledCourse(courseId),
//     queryFn: () =>
//       apiService.get<GetEnrolledCourseResponse>(
//         `/learning/enrolled-courses/${courseId}`,
//       ),
//   });
// };
