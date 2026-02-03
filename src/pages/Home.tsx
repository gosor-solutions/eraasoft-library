import { AboutUs } from "@/components/features/Home/AboutUs";
import { AppShowcaseSection } from "@/components/features/Home/AppShowcase";
import { ContactSection } from "@/components/features/Home/ContactUs";
import { CoursesSection } from "@/components/features/Home/Courses";
import { HeroSection } from "@/components/features/Home/Hero";
import { ServicesSection } from "@/components/features/Home/Services";
import { TestimonialsSection } from "@/components/features/Home/Testimonials";

export function Home() {
  return (
    <div>
      <HeroSection />
      <AboutUs />
      <ServicesSection />
      <CoursesSection />
      <TestimonialsSection />
      <AppShowcaseSection />
      <ContactSection />
    </div>
  );
}
