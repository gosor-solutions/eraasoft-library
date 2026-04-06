import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { apiService } from "../../services/apiService";
import type { CompanyImage, CompanyReview, PartnerCompanyImage } from "../../types/company";

export const useGetCompanyImages = () => {
  return useQuery({
    queryKey: QUERY_KEYS.aboutUs.images(),
    queryFn: () => apiService.get<{ data: CompanyImage[] }>("/company-images"),
    select: (data) => data?.data || [],
  });
};

export const useGetCompanyReviews = () => {
  return useQuery({
    queryKey: QUERY_KEYS.aboutUs.reviews(),
    queryFn: () => apiService.get<{ data: CompanyReview[] }>("/company-reviews"),
    select: (data) => data?.data || [],
  });
};

export const useGetPartnerCompanyImages = () => {
  return useQuery({
    queryKey: QUERY_KEYS.aboutUs.partnerImages(),
    queryFn: () => apiService.get<{ data: PartnerCompanyImage[] }>("/partner-company-images"),
    select: (data) => data?.data || [],
  });
};
