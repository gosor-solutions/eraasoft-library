import { IconContext } from "react-icons";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export function GlobalProviders() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <IconContext.Provider
          value={{ className: "text-2xl text-brand-primary" }}
        >
          <RouterProvider router={router} />
        </IconContext.Provider>
      </QueryClientProvider>
    </>
  );
}
