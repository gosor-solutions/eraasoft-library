import { GlobalProviders } from "@/providers";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-inter">
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
