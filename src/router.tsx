import { createBrowserRouter } from "react-router";
import CreateNewPassword from "./pages/AuthPages/CreateNewPassword";
import ForgetPassword from "./pages/AuthPages/ForgetPassword";
import Login from "./pages/AuthPages/Login";
import OTP from "./pages/AuthPages/OTP";
import SignupForm from "./pages/AuthPages/Register";
import { CheckoutOrderSummary } from "./pages/Checkout/CheckoutOrderSummary";
import { ContactUs } from "./pages/ContactUs";
import CourseDetails from "./pages/CourseDetails";
import CourseTest from "./pages/CourseTest";
import { CoursesPage } from "./pages/Courses/CoursesPage";
import { SingleCoursePage } from "./pages/Courses/SingleCoursePage";
import { FreeMaterialDetailsPage } from "./pages/FreeMaterials/FreeMaterialDetailsPage";
import { FreeMaterialsPage } from "./pages/FreeMaterials/FreeMaterialsPage";
import { Home } from "./pages/Home";
import { MainLayout } from "./pages/Layouts/MainLayout";
import { ProfilePage } from "./pages/Profile";
import { TopicCoursesPage } from "./pages/Topics/TopicCoursesPage";
import { TopicsPage } from "./pages/Topics/TopicsPage";

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
        path: "topics",
        children: [
          {
            index: true,
            element: <TopicsPage />,
          },
          {
            path: ":id",
            element: <TopicCoursesPage />,
          },
        ],
      },
      {
        path: "free-materials",
        children: [
          {
            index: true,
            element: <FreeMaterialsPage />,
          },
          {
            path: ":id",
            element: <FreeMaterialDetailsPage />,
          },
        ],
      },
      {
        path: "checkout",
        element: <CheckoutOrderSummary />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "course-details/:id",
        element: <CourseDetails />,
      },
      {
        path: "course-details/:id/quiz/:quizId",
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
