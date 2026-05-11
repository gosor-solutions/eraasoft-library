import { createBrowserRouter } from "react-router";
import { AboutUs } from "./components/features/Home/AboutUs";
import { ContactUs } from "./pages/ContactUs";
import { CoursesPage } from "./pages/Courses/CoursesPage";
import { SingleCoursePage } from "./pages/Courses/SingleCoursePage";
import { Home } from "./pages/Home";
import { MainLayout } from "./pages/Layouts/MainLayout";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsAndConditions } from "./pages/TermsAndConditions";

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
      // {
      //   path: "/founder",
      //   element: <FounderPage />,
      // },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      // {
      //   path: "placemetn-test",
      //   element: <PlacementTest />,
      // },
      // {
      //   path: "training",
      //   element: <TrainingPage />,
      // },
      {
        path: "terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      // {
      //   path: "free-materials",
      //   children: [
      //     {
      //       index: true,
      //       element: <FreeMaterialsPage />,
      //     },
      //     {
      //       path: ":id",
      //       element: <FreeMaterialDetailsPage />,
      //     },
      //   ],
      // },
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
      // {
      //   path: "topics",
      //   children: [
      //     {
      //       index: true,
      //       element: <TopicsPage />,
      //     },
      //     {
      //       path: ":id",
      //       element: <TopicCoursesPage />,
      //     },
      //   ],
      // },
      // {
      //   path: "blogs",
      //   children: [
      //     {
      //       index: true,
      //       element: <BlogsPage />,
      //     },
      //     {
      //       path: ":id",
      //       element: <BlogDetailsPage />,
      //     },
      //   ],
      // },

      // {
      //   path: "checkout",
      //   element: <CheckoutOrderSummary />,
      // },

      // {
      //   path: "profile",
      //   element: <ProfilePage />,
      // },
      // {
      //   path: "course-details/:id",
      //   element: <CourseDetails />,
      // },
      // {
      //   path: "course-details/:id/quiz/:quizId",
      //   element: <CourseTest />,
      // },
      // {
      //   path: "login",
      //   element: <Login />,
      // },
      // {
      //   path: "register",
      //   element: <SignupForm />,
      // },
      // {
      //   path: "otp",
      //   element: <OTP />,
      // },
      // {
      //   path: "forget-password",
      //   element: <ForgetPassword />,
      // },
      // {
      //   path: "reset-password",
      //   element: <CreateNewPassword />,
      // },
    ],
  },
]);
