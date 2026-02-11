import { createBrowserRouter } from "react-router";
import { ContactUs } from "./pages/ContactUs";
import CourseDetails from "./pages/CourseDetails";
import CourseTest from "./pages/CourseTest";
import { CoursesPage } from "./pages/Courses/CoursesPage";
import { SingleCoursePage } from "./pages/Courses/SingleCoursePage";
import { Home } from "./pages/Home";
import { ProfilePage } from "./pages/Profile";
import Login from "./pages/AuthPages/Login";
import OTP from "./pages/AuthPages/OTP";
import ForgetPassword from "./pages/AuthPages/ForgetPassword";
import CreateNewPassword from "./pages/AuthPages/CreateNewPassword";
import SignupForm from "./pages/AuthPages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
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
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <SignupForm />,
      },
      {
        path: "otp",
        element: <OTP />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "reset-password",
        element: <CreateNewPassword />,
      },
    ],
  },
]);
