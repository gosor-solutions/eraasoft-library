import { Button } from "@/components/shared/button";
import { Loading } from "@/components/shared/Loading";
import { NoData } from "@/components/shared/NoData";
import { useGetCourses } from "@/hooks/queries/useCourseQueries";
import { useSearchParams } from "react-router";
import { CoursesGrid } from "./CoursesGrid";

export function RelatedCourses() {
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
        <CoursesGrid courses={coursesQuery.data?.data?.slice(0, 3)} />
        <div className="flex justify-center">
          <Button>View All Courses</Button>
        </div>
      </>
    );
  }

  return (
    <section className="w-full border-t border-gray-200 px-4 py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-3xl font-semibold md:text-4xl lg:mb-16">
          Related Courses
        </h2>
        {content}
      </div>
    </section>
  );
}
