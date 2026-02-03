import { IconContext } from "react-icons";
import { RouterProvider } from "react-router";
import { router } from "./router";

export function GlobalProviders() {
  return (
    <>
      <IconContext.Provider value={{ className: "text-2xl text-brand-primary" }}>
        <RouterProvider router={router} />
      </IconContext.Provider>
    </>
  );
}
