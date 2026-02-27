import { QueryClientProvider } from "@tanstack/react-query";
import { IconContext } from "react-icons";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { queryClient } from "./lib/queryClient";
import { router } from "./router";

export function GlobalProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <IconContext.Provider
        value={{ className: "text-2xl text-brand-primary" }}
      >
        <RouterProvider router={router} />
      </IconContext.Provider>
      <Toaster richColors position="top-left" />
    </QueryClientProvider>
  );
}
