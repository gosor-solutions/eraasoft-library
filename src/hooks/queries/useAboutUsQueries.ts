import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { apiService } from "../../services/apiService";
import type { CompanyImage, CompanyReview, PartnerCompanyImage, Credit, GalleryCategory } from "../../types/company";

export const useGetCompanyImages = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.aboutUs.images(), params],
    queryFn: () => apiService.get<{ data: CompanyImage[] }>("/company-images", params),
    select: (data) => data?.data || [],
  });
};

export const useGetGalleryCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.aboutUs.galleryCategories(),
    queryFn: () => apiService.get<{ data: GalleryCategory[] }>("/company-image-categories"),
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

export const useGetCredits = () => {
  return useQuery({
    queryKey: QUERY_KEYS.aboutUs.credits(),
    queryFn: () => apiService.get<{ data: Credit[] }>("/credits"),
    select: (data) => data?.data || [],
  });
};
