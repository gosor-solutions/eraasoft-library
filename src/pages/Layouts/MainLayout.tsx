import { Footer } from "@/components/layout/Footer";
import { NavBar } from "@/components/layout/Navbar";
import { ScrollToTop } from "@/components/shared/ScrollTop";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import { authHelper } from "@/helpers/authHelper";
import { FaWhatsapp } from "react-icons/fa";
import { useGetSettings } from "@/hooks/queries/useSettingsQueries";

export function MainLayout() {
  const location = useLocation();
  const { data: settings } = useGetSettings();

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

  const whatsappNumber = settings?.whatsapp_num_1 || "";

  return (
    <>
      <NavBar />
      <div className="mt-16 min-h-[90dvh]">
        <ScrollToTop />
        <Outlet />
      </div>
      <Footer />
      <ScrollRestoration />
      {!authHelper.isAuthenticated() && whatsappNumber && (
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:scale-110 transition-transform duration-300 z-50 flex items-center justify-center cursor-pointer"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="w-7 h-7" />
        </a>
      )}
    </>
  );
}
