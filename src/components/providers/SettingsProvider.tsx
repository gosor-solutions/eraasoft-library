import { useEffect } from "react";
import { useGetOwnerSettings, useGetSettings } from "../../hooks/queries/useSettingsQueries";
import { Loading } from "../shared/Loading";
import { useGetCompanyImages, useGetCompanyReviews, useGetGalleryCategories, useGetPartnerCompanyImages } from "@/hooks/queries/useAboutUsQueries";

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { data: settings, isLoading: settingsLoading } = useGetSettings();
  const { isLoading: ownerLoading } = useGetOwnerSettings();
  const { isLoading: reviewsLoading } = useGetCompanyReviews();
  const { isLoading: companyImagesLoading } = useGetCompanyImages();
  const { isLoading: galleryCategoriesLoading } = useGetGalleryCategories();
  const { isLoading: partnerCompanyImagesLoading } = useGetPartnerCompanyImages();

  const loading = settingsLoading || ownerLoading || reviewsLoading || companyImagesLoading || galleryCategoriesLoading || partnerCompanyImagesLoading;


  useEffect(() => {
    if (settings) {
      const root = document.documentElement;
      if (settings.primary_color) {
        root.style.setProperty("--color-brand-primary", settings.primary_color);
      }
    }
  }, [settings]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading fullScreen />
      </div>
    );
  }

  return <>{children}</>;
}
