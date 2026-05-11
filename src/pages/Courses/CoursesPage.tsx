import { CoursesGrid } from "@/components/features/Courses/CoursesGrid";
import { Loading } from "@/components/shared/Loading";
import { NoData } from "@/components/shared/NoData";
import { useGetCourses } from "@/hooks/queries/useCourseQueries";
import { CourseTypeLabels } from "@/types/course";
import { useSearchParams } from "react-router";

export function CoursesPage() {
  const [params] = useSearchParams();

  const type = params.get("type");

  const coursesQuery = useGetCourses({
    ...(type ? { type } : {}),
  });

  if (coursesQuery.isPending) {
    return <Loading fullScreen />;
  }

  const allCourses = coursesQuery.data?.data || [];

  if (!allCourses.length) {
    return (
      <section className="w-full px-4 py-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col items-center gap-10">
            <h1 className="text-3xl font-bold md:text-4xl">
              {getCourseType(type)}
            </h1>
          </div>
          <NoData data="Courses" />
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="w-full px-4 py-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col items-center gap-10">
            <h1 className="text-3xl font-bold md:text-4xl">
              {getCourseType(type)}
            </h1>
          </div>

          <CoursesGrid courses={allCourses} />
        </div>
      </section>
    </>
  );
}

function getCourseType(type?: string | null) {
  if (!type) return "All Courses";
  const typeNum = parseInt(type);
  return (
    CourseTypeLabels[typeNum as keyof typeof CourseTypeLabels] || "Courses"
  );
}