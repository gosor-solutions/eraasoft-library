import { CoursePageHeader } from "@/components/features/Courses/CoursePageHeader";
import { CoursesGrid } from "@/components/features/Courses/CoursesGrid";

export function CoursesPage() {
  return (
    <>
      <section className="w-full px-4 py-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <h1 className="mb-6 text-3xl font-bold md:text-4xl">Courses</h1>

          {/* Search and Filter Bar */}
          <CoursePageHeader />

          <CoursesGrid courses={[]} />
        </div>
      </section>
    </>
  );
}
