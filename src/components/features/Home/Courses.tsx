import { Button } from "@/components/shared/button";
import { Loading } from "@/components/shared/Loading";
import { NoData } from "@/components/shared/NoData";
import { useGetCourses } from "@/hooks/queries/useCourseQueries";
import { CoursesGrid } from "../Courses/CoursesGrid";

// Main Courses Component
export function CoursesSection() {
  const coursesQuery = useGetCourses();

  if (coursesQuery.isPending) {
    return <Loading size={40} color="#000000" />;
  }

  if (!coursesQuery.data?.data?.length) {
    return <NoData data="Courses" />;
  }

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader />
        <CoursesGrid courses={coursesQuery.data.data} />
        <div className="flex justify-center">
          <Button className="text-lg px-4 py-6 rounded-xl font-normal">
            Explore all Courses
          </Button>
        </div>
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
        Elevate your language skills with our expert-led programs, designed to
        take you from foundational understanding to professional mastery.
      </p>
    </div>
  );
}
