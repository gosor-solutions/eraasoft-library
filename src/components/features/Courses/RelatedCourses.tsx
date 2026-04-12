import { CoursesGrid } from "./CoursesGrid";
import { useGetCourses } from "@/hooks/queries/useCourseQueries";
import { Loading } from "@/components/shared/Loading";
import { NoData } from "@/components/shared/NoData";

export function RelatedCourses() {
  const coursesQuery = useGetCourses();

  if (coursesQuery.isPending) {
    return <Loading size={40} color="#000000" />;
  }

  if (!coursesQuery.data?.data?.length) {
    return <NoData data="Courses" />;
  }

  return (
    <section className="w-full border-t border-gray-200 px-4 py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">

        <h2 className="mb-12 text-3xl font-semibold md:text-4xl lg:mb-16">
          Related Courses
        </h2>
        <CoursesGrid courses={coursesQuery.data.data.slice(0, 3)} />
      </div>
    </section>
  );
}
