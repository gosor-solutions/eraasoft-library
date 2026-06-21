import { AboutUs } from "@/components/features/Home/AboutUs";
import { AppShowcaseSection } from "@/components/features/Home/AppShowcase";
import { BlogSection } from "@/components/features/Home/BlogSection";
import { Credits } from "@/components/features/Home/Credits";
import { HeroSection } from "@/components/features/Home/Hero";
import { authHelper } from "@/helpers/authHelper";
import { AuthedHome } from "./AuthedHome";

export function Home() {
  if (authHelper.isAuthenticated()) {
    return <AuthedHome />;
  }

  return (
    <div>
      <HeroSection />
      <AboutUs />
      <BlogSection />
      <Credits />
      <AppShowcaseSection />
    </div>
  );
}
