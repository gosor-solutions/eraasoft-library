import { Footer } from "@/components/layout/Footer";
import { NavBar } from "@/components/layout/Navbar";
import { ScrollToTop } from "@/components/shared/ScrollTop";
import { Outlet, useLocation } from "react-router";

export function MainLayout() {
  const location = useLocation();

  const authRoutes = [
    "/register",
    "/login",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
    "/otp",
  ];

  const isAuthRoute = authRoutes.some((route) =>
    location.pathname.startsWith(route),
  );

  if (isAuthRoute) {
    return <Outlet />;
  }

  return (
    <>
      <NavBar />
      <div className="mt-16 min-h-[90dvh]">
        <ScrollToTop />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
