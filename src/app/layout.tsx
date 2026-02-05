import { Footer } from "@/components/layout/Footer";
import { NavBar } from "@/components/layout/Navbar";
import { GlobalProviders } from "@/providers";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GlobalProviders>
          <NavBar />
          <div className="mt-16">{children}</div>
          <Footer />
        </GlobalProviders>
      </body>
    </html>
  );
}
