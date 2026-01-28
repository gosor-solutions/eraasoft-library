import { RouterProvider } from "react-router";
import { router } from "./router";

export function GlobalProviders() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
