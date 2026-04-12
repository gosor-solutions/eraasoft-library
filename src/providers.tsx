import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IconContext } from "react-icons";
import { RouterProvider } from "react-router";
import { SettingsProvider } from "./components/providers/SettingsProvider";
import { Toaster } from "./components/shared/sonner";
import { router } from "./router";
export function GlobalProviders() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SettingsProvider>
          <IconContext.Provider
            value={{ className: "text-2xl text-brand-primary" }}
          >
            <RouterProvider router={router} />
            <Toaster position="bottom-right" richColors theme="light" />
          </IconContext.Provider>
        </SettingsProvider>
      </QueryClientProvider>
    </>
  );
}
