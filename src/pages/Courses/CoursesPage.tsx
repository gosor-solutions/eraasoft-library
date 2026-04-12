import { CoursesGrid } from "@/components/features/Courses/CoursesGrid";
import { Loading } from "@/components/shared/Loading";
import { NoData } from "@/components/shared/NoData";
import { Pagination } from "@/components/shared/Pagination";
import { useGetCourses } from "@/hooks/queries/useCourseQueries";
import { useSearchParams } from "react-router";

export function CoursesPage() {
  const [params] = useSearchParams();

  const type = params.get("type")

  const coursesQuery = useGetCourses({
    page: params.get("page") || 1,
    ...(type ? { type } : {}),
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
          <h1 className="mb-6 text-3xl font-bold md:text-4xl">{getCourseType(type)} </h1>

          {/* Search and Filter Bar */}
          {/* <CoursePageHeader /> */}

          <CoursesGrid courses={coursesQuery.data.data} />
          <Pagination meta={coursesQuery.data.meta} />
        </div>
      </section>
    </>
  );
}

function getCourseType(type?: string) {
  if(!type) return "All Courses";
  return TYPE_MAP[type];
}

const TYPE_MAP = {
  0: "Adult Courses",
  1: "Kids Courses",
}