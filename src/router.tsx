import { createBrowserRouter } from "react-router";
import { ContactUs } from "./pages/ContactUs";
import { Home } from "./pages/Home";
import { MainLayout } from "./pages/Layouts/MainLayout";
import { CoursesPage } from "./pages/CoursesPage";
import CourseDetails from "./pages/CourseDetails";
import CourseTest from "./pages/CourseTest";

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
      {
        // path: "courses/:courseId",
        path: "course-details",
        element: <CourseDetails />,
      },
      {
        // path: "courses/:courseId",
        path: "course-test",
        element: <CourseTest />,
      },
    ],
  },
]);
