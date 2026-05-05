import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../../services/apiService";
import type { ApiResponse } from "../../types/api";
import type {
  AuthWithPhoneAndNameRequest,
  AuthWithPhoneRequest,
  LoginRequest,
  UserResource,
  VerifyOtpRequest,
} from "../../types/auth";

// export const useRefreshToken = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (data: RefreshTokenBody) =>
//       apiService.post<RefreshTokenResponse>("/refresh-token", data),
//     onSuccess: () => {
//       queryClient.invalidateQueries();
//     },
//   });
// };

// export const useGoogleLogin = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (data: GoogleLoginBody) =>
//       apiService.post<GoogleLoginResponse>("/google/login", data),
//     onSuccess: () => {
//       queryClient.invalidateQueries();
//     },
//   });
// };

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: AuthWithPhoneAndNameRequest) =>
      apiService.post<ApiResponse<{ phone: string }>>(
        "/auth/register",
        data,
      ),
  });
};

export const useLoginWithPhone = () => {
  return useMutation({
    mutationFn: (data: AuthWithPhoneRequest) =>
      apiService.post<ApiResponse<{ phone: string }> | null>(
        "/auth/login-with-phone",
        data,
      ),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) =>
      apiService.post<ApiResponse<{
        token: string;
        user: UserResource;
      }> | null>("/student/login", data),
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (data: VerifyOtpRequest) =>
      apiService.post<ApiResponse<{
        token: string;
        user: UserResource;
      }> | null>("/auth/verify-otp", data),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiService.post<ApiResponse<null>>("/student/logout"),
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
