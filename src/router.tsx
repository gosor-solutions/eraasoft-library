import { createBrowserRouter } from "react-router";
import { MainLayout } from "./pages/Layouts/MainLayout";
import { ContactUs } from "./pages/ContactUs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <div>Home</div>,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
    ],
  },
]);
