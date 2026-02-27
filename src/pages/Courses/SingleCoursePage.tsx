import { CourseHeroSection } from "@/components/features/Courses/CourseHero";
import { RelatedCourses } from "@/components/features/Courses/RelatedCourses";
import { Testimonials } from "@/components/features/Courses/Testmonials";
import { WhatWillYouLearn } from "@/components/features/Courses/WhatWillYouLearn";
import { Loading } from "@/components/shared/Loading";
import { NoData } from "@/components/shared/NoData";
import { useGetCourse } from "@/hooks/queries/useCourseQueries";
import { useParams } from "react-router";

export function SingleCoursePage() {
  const { id } = useParams();
  const courseQuery = useGetCourse(Number(id));

  if (courseQuery.isLoading) {
    return <Loading size={40} />;
  } else if (!courseQuery.data?.data) {
    return <NoData data={"Data"} />;
  }

  return (
    <div>
      <CourseHeroSection course={courseQuery.data?.data} />
      <WhatWillYouLearn learn={courseQuery.data?.data?.what_you_will_learn} />
      <Testimonials />
      <RelatedCourses />
    </div>
  );
}
