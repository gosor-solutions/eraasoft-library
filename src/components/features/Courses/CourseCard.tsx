import { Button } from "@/components/shared/button";
import { useCustomNavigation } from "@/lib/hooks/useCustomNavigation";
import type { Course } from "@/types/course";
import { CiDollar } from "react-icons/ci";
import { TfiStatsUp } from "react-icons/tfi";

// Course Card Component
export function CourseCard({ course, index }: { course: Course; index?: number }) {
  const navigate = useCustomNavigation();

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index ? index * 100 : 0}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Course Image */}
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full aspect-4/3 object-cover"
        />
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Course Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>

        {/* Course Description */}
        <p className="text-brand-gray text-sm mb-4 line-clamp-3">
          {course.description}
        </p>

        {/* Course Info */}
        <div className="flex items-center justify-between mb-4">
          {/* Level */}
          <div className="flex items-center gap-2 text-gray-700">
            <div className="bg-brand-secondary rounded-full flex items-center justify-center">
              <TfiStatsUp className="m-1.5 size-5" />
            </div>
            <span className="text-sm font-medium">{course.level}</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 text-gray-700">
            <div className="bg-brand-secondary rounded-full flex items-center justify-center">
              <CiDollar className="m-1 size-6" />
            </div>
            <span className="text-sm font-medium">{course.price}</span>
          </div>
        </div>

        <Button
          onClick={() => navigate(`/courses/${course.id}`)}
          className="w-full"
        >
          View Course
        </Button>
      </div>
    </div>
  );
}
