import { createBrowserRouter } from "react-router";
import { ContactUs } from "./pages/ContactUs";
import { Home } from "./pages/Home";
import { MainLayout } from "./pages/Layouts/MainLayout";
import { CoursesPage } from "./pages/CoursesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "courses",
        element: <CoursesPage />,
      },
    ],
  },
]);
