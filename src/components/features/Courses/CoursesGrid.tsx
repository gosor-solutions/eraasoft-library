import { CourseCard } from "@/components/features/Courses/CourseCard";
import type { Course } from "@/types/course";

// Courses Grid Component
export function CoursesGrid({courses}: {courses: Course[]}) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
