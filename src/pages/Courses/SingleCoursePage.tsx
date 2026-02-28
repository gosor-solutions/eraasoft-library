import { CourseHeroSection } from "@/components/features/Courses/CourseHero";
import { RelatedCourses } from "@/components/features/Courses/RelatedCourses";
import { Testimonials } from "@/components/features/Courses/Testmonials";
import { WhatWillYouLearn } from "@/components/features/Courses/WhatWillYouLearn";

export function SingleCoursePage() {
  return (
    <div>
      <CourseHeroSection />
      <WhatWillYouLearn />
      <Testimonials />
      <RelatedCourses />
    </div>
  );
}
