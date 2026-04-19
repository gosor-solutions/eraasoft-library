import { AboutUs } from "@/components/features/Home/AboutUs";
import { AppShowcaseSection } from "@/components/features/Home/AppShowcase";
import { BlogSection } from "@/components/features/Home/BlogSection";
import { CoursesSection } from "@/components/features/Home/Courses";
import { HeroSection } from "@/components/features/Home/Hero";
import { ServicesSection } from "@/components/features/Home/Services";
import { authHelper } from "@/helpers/authHelper";
import { AuthedHome } from "./AuthedHome";
import { Credits } from "@/components/features/Home/Credits";

export function Home() {
  if (authHelper.isAuthenticated()) {
    return <AuthedHome />;
  }

  return (
    <div>
      <HeroSection />
      <AboutUs />
      <ServicesSection />
      <BlogSection />
      <CoursesSection />
      <Credits />
      <AppShowcaseSection />
      {/* <ContactSection /> */}
    </div>
  );
}
