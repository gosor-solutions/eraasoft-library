import { Loading } from "@/components/shared/Loading";
import { NoData } from "@/components/shared/NoData";
import { useGetCourses } from "@/hooks/queries/useCourseQueries";
import { CoursesGrid } from "./CoursesGrid";

export function RelatedCourses({ courseId }: {courseId:number}) {
  const coursesQuery = useGetCourses();

  if (coursesQuery.isPending) {
    return <Loading size={40} color="#000000" />;
  }

  if (!coursesQuery.data?.data?.length) {
    return <NoData data="Courses" />;
  }

  const courses = coursesQuery
    .data
    .data
    .filter(course => course.id !== courseId)
    .sort(() => Math.random() > 0.5 ? 1 : -1)
    .slice(0, 3)

  return (
    <section className="w-full border-t border-gray-200 px-4 py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">

        <h2 className="mb-12 text-3xl font-semibold md:text-4xl lg:mb-16">
          Related Courses
        </h2>
        <CoursesGrid courses={courses} />
      </div>
    </section>
  );
}
