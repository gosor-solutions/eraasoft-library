import { Footer } from "@/components/layout/Footer";
import { NavBar } from "@/components/layout/Navbar";
import { Outlet } from "react-router";

export function MainLayout() {
  return (
    <>
      <NavBar />
      <div className="mt-16">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
