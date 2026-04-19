import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { apiService } from "../../services/apiService";
import type { AppSettings, MobileSettingsResponse, OwnerSettings, Setting } from "../../types/settings";
import type { ApiResponse } from "@/types/api";

export const useGetSettings = () => {
  return useQuery({
    queryKey: QUERY_KEYS.settings.all(),
    queryFn: () => apiService.get<{ data: Setting[] }>("/settings"),
    select: (data): AppSettings => {
      return data?.data.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {} as AppSettings);
    },
  });
};

export const useGetOwnerSettings = () => {
  return useQuery({
    queryKey: [...QUERY_KEYS.settings.all(), "mobile"],
    queryFn: () => apiService.get<ApiResponse<MobileSettingsResponse>>("/settings/mobile"),
    select: (data): OwnerSettings => {
      const ownerPage = data?.data?.owner_page || [];
      return ownerPage.reduce((acc, setting) => {
        acc[setting.key as keyof OwnerSettings] = setting.value;
        return acc;
      }, {} as OwnerSettings);
    },
  });
};
