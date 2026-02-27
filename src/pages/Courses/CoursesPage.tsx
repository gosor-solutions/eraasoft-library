import { CoursePageHeader } from "@/components/features/Courses/CoursePageHeader";
import { CoursesGrid } from "@/components/features/Courses/CoursesGrid";
import { Loading } from "@/components/shared/Loading";
import { NoData } from "@/components/shared/NoData";
import { Pagination } from "@/components/shared/Pagination";
import { useGetCourses } from "@/hooks/queries/useCourseQueries";
import { useSearchParams } from "react-router";

export function CoursesPage() {
  const [params] = useSearchParams();
  const coursesQuery = useGetCourses({
    page: params.get("page") || "1",
  });

  let content = null;

  if (coursesQuery.isPending) {
    content = <Loading size={40} color="#000000" />;
  } else if (!coursesQuery.data?.data?.length) {
    content = <NoData data="Courses" />;
  } else {
    content = (
      <>
        <CoursesGrid courses={coursesQuery.data?.data} />
        <Pagination meta={coursesQuery.data?.meta} />
      </>
    );
  }

  return (
    <>
      <section className="w-full px-4 py-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-6 text-3xl font-bold md:text-4xl">Courses</h1>

          {/* <CoursePageHeader /> */}
          {content}
        </div>
      </section>
    </>
  );
}
