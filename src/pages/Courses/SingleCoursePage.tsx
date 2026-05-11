import { CourseHeroSection } from "@/components/features/Courses/CourseHero";
import { RelatedCourses } from "@/components/features/Courses/RelatedCourses";
import { Testimonials } from "@/components/features/Courses/Testmonials";
import { WhatWillYouLearn } from "@/components/features/Courses/WhatWillYouLearn";
import { Loading } from "@/components/shared/Loading";
import { NoData } from "@/components/shared/NoData";
import { useGetCourse } from "@/hooks/queries/useCourseQueries";
import { useParams } from "react-router";

export function SingleCoursePage() {
  const { id } = useParams<{ id: string }>();
  const courseQuery = useGetCourse(Number(id));

  if (courseQuery.isPending) {
    return <Loading fullScreen />;
  }

  if (!courseQuery.data?.data) {
    return <NoData data="Courses" />;
  }

  return (
    <div>
      <CourseHeroSection course={courseQuery.data.data} />
      <WhatWillYouLearn learn={courseQuery.data.data.what_you_will_learn} />
      <Testimonials />
      <RelatedCourses courseId={Number(id)}/>
    </div>
  );
}
