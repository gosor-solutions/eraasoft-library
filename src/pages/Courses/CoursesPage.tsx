import { CoursesGrid } from "@/components/features/Courses/CoursesGrid";
import { Loading } from "@/components/shared/Loading";
import { NoData } from "@/components/shared/NoData";
import { Pagination } from "@/components/shared/Pagination";
import { useGetCourses } from "@/hooks/queries/useCourseQueries";
import { useSearchParams } from "react-router";

export function CoursesPage() {
  const [params] = useSearchParams();
  const coursesQuery = useGetCourses({
    page: params.get("page") || 1,
  });

  if (coursesQuery.isPending) {
    return <Loading size={40} color="#000000" />;
  }

  if (!coursesQuery.data?.data?.length) {
    return <NoData data="Courses" />;
  }

  return (
    <>
      <section className="w-full px-4 py-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <h1 className="mb-6 text-3xl font-bold md:text-4xl">Courses</h1>

          {/* Search and Filter Bar */}
          {/* <CoursePageHeader /> */}

          <CoursesGrid courses={coursesQuery.data.data} />
          <Pagination meta={coursesQuery.data.meta} />
        </div>
      </section>
    </>
  );
}
