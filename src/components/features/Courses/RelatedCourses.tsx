import { courseServer } from "@/api/server/courses";
import { CoursesGrid } from "./CoursesGrid";

export async function RelatedCourses() {
  const courses = await courseServer.getAll();

  return (
    <section className="w-full border-t border-gray-200 px-4 py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-3xl font-semibold md:text-4xl lg:mb-16">
          Related Courses
        </h2>
        <CoursesGrid courses={courses.data} />
      </div>
    </section>
  );
}
