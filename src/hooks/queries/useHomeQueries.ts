import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { apiService } from "../../services/apiService";
import type { GetHomeResponse, GetHeroSlidesResponse } from "../../types/home";

export const useGetHome = () => {
  return useQuery({
    queryKey: QUERY_KEYS.home.all(),
    queryFn: () => apiService.get<GetHomeResponse>("/home"),
  });
};

export const useGetHeroSlides = () => {
  return useQuery({
    queryKey: QUERY_KEYS.heroSlides.all(),
    queryFn: () => apiService.get<GetHeroSlidesResponse>("/hero-slides"),
  });
};
