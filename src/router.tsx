import { createBrowserRouter } from "react-router";
import { ContactUs } from "./pages/ContactUs";
import CourseDetails from "./pages/CourseDetails";
import CourseTest from "./pages/CourseTest";
import { CoursesPage } from "./pages/Courses/CoursesPage";
import { SingleCoursePage } from "./pages/Courses/SingleCoursePage";
import { Home } from "./pages/Home";
import { MainLayout } from "./pages/Layouts/MainLayout";
import { ProfilePage } from "./pages/Profile";

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
        children: [
          {
            index: true,
            element: <CoursesPage />,
          },
          {
            path: ":id",
            element: <SingleCoursePage />,
          },
        ],
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        // path: "courses/:courseId",
        path: "course-details",
        element: <CourseDetails />,
      },
      {
        path: "course-test",
        element: <CourseTest />,
      },
    ],
  },
]);
