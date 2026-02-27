import { Loading } from "@/components/shared/Loading";
import { NoData } from "@/components/shared/NoData";
import { useGetCourses } from "@/hooks/queries/useCourseQueries";
import { useSearchParams } from "react-router";
import { CoursesGrid } from "../Courses/CoursesGrid";

export function CoursesSection() {
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
      </>
    );
  }

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader />
        {content}
      </div>
    </section>
  );
}

// Section Header Component
function SectionHeader() {
  return (
    <div className="text-center mb-12 sm:mb-16">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
        Courses
      </h2>
      <p className="text-brand-gray text-lg max-w-2xl mx-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae
        libero cursus, suscipit risus eget, pretium nulla. Quisqu
      </p>
    </div>
  );
}
