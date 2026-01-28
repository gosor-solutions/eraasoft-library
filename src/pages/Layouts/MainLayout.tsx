import { Footer } from "@/components/layout/Footer";
import { NavBar } from "@/components/layout/Navbar";
import { Outlet } from "react-router";

export function MainLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
