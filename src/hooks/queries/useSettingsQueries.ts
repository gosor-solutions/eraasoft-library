import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { apiService } from "../../services/apiService";
import type { AppSettings, Setting } from "../../types/settings";

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
