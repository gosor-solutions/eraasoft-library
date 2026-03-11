import { AboutUs } from "@/components/features/Home/AboutUs";
import { AppShowcaseSection } from "@/components/features/Home/AppShowcase";
import { CoursesSection } from "@/components/features/Home/Courses";
import { HeroSection } from "@/components/features/Home/Hero";
import { ServicesSection } from "@/components/features/Home/Services";
import { TestimonialsSection } from "@/components/features/Home/Testimonials";
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
      <ServicesSection />
      <CoursesSection />
      <TestimonialsSection />
      <AppShowcaseSection />
      {/* <ContactSection /> */}
    </div>
  );
}
