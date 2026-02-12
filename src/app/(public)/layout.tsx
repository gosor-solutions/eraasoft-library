import { Footer } from "@/components/layout/Footer";
import { NavBar } from "@/components/layout/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="mt-16">{children}</main>
      <Footer />
    </>
  );
}
