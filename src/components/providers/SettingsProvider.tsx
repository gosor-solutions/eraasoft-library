import { useEffect } from "react";
import { useGetSettings } from "../../hooks/queries/useSettingsQueries";

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { data: settings, isLoading } = useGetSettings();

  useEffect(() => {
    if (settings) {
      const root = document.documentElement;
      if (settings.primary_color) {
        root.style.setProperty("--color-brand-primary", settings.primary_color);
      }
      if (settings.secondary_color) {
        root.style.setProperty(
          "--color-brand-secondary",
          settings.secondary_color,
        );
      }
    }
  }, [settings]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  // if (isError) {
  //   return (
  //     <div className="flex flex-col items-center justify-center min-h-screen">
  //       <p className="text-red-500 mb-4">Failed to load application settings.</p>
  //       <button
  //         onClick={() => window.location.reload()}
  //         className="px-4 py-2 bg-brand-primary text-white rounded-lg"
  //       >
  //         Retry
  //       </button>
  //     </div>
  //   );
  // }

  return <>{children}</>;
}
