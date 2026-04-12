import { createBrowserRouter } from "react-router";
import { AboutUs } from "./components/features/Home/AboutUs";
import CreateNewPassword from "./pages/AuthPages/CreateNewPassword";
import ForgetPassword from "./pages/AuthPages/ForgetPassword";
import Login from "./pages/AuthPages/Login";
import OTP from "./pages/AuthPages/OTP";
import SignupForm from "./pages/AuthPages/Register";
import { CheckoutOrderSummary } from "./pages/Checkout/CheckoutOrderSummary";
import { ContactUs } from "./pages/ContactUs";
import CourseDetails from "./pages/CourseDetails";
import CourseTest from "./pages/CourseTest";
import { TermsAndConditions } from "./pages/TermsAndConditions";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { CoursesPage } from "./pages/Courses/CoursesPage";
import { SingleCoursePage } from "./pages/Courses/SingleCoursePage";
import { FreeMaterialDetailsPage } from "./pages/FreeMaterials/FreeMaterialDetailsPage";
import { FreeMaterialsPage } from "./pages/FreeMaterials/FreeMaterialsPage";
import { Home } from "./pages/Home";
import { MainLayout } from "./pages/Layouts/MainLayout";
import { ProfilePage } from "./pages/Profile";
import { TopicCoursesPage } from "./pages/Topics/TopicCoursesPage";
import { TopicsPage } from "./pages/Topics/TopicsPage";
import { TrainingPage } from "./pages/Training/TrainingPage";
import PlacementTest from "./pages/PlacmentTest/PlacmentTest";
import { BlogsPage } from "./pages/Blogs/BlogsPage";
import { BlogDetailsPage } from "./pages/Blogs/BlogDetailsPage";

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
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "placemetn-test",
        element: <PlacementTest />,
      },
      {
        path: "training",
        element: <TrainingPage />,
      },
      {
        path: "terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
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
        path: "blogs",
        children: [
          {
            index: true,
            element: <BlogsPage />,
          },
          {
            path: ":id",
            element: <BlogDetailsPage />,
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
