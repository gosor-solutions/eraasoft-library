"use client";

import { Course } from "@/api/types/course";
import { Button } from "@/components/shared/Button";
import { MyLink } from "@/components/shared/MyLink";
import { getRandomCourseImage } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { CiDollar } from "react-icons/ci";
import { TfiStatsUp } from "react-icons/tfi";

// Course Card Component
export function CourseCard({ course }: { course: Course }) {
  const randomImage = getRandomCourseImage();
  const [image, setImage] = useState(course.image);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Course Image */}
      <div className="relative">
        <Image
          src={image}
          alt={course.title}
          onError={() => setImage(randomImage)}
          width={300}
          height={300}
          className="w-full aspect-4/3 object-cover"
        />
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Course Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>

        {/* Course Description */}
        <p className="text-brand-gray text-sm mb-4 line-clamp-3 min-h-16">
          {course.description}
        </p>

        {/* Course Info */}
        <div className="flex items-center justify-between mb-4">
          {/* Level */}
          <div className="flex items-center gap-2 text-gray-700">
            <div className="bg-brand-secondary rounded-full flex items-center justify-center">
              <TfiStatsUp className="m-1.5 size-5 text-2xl text-brand-primary" />
            </div>
            <span className="text-sm font-medium">{course.level}</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 text-gray-700">
            <div className="bg-brand-secondary rounded-full flex items-center justify-center">
              <CiDollar className="m-1 size-6 text-2xl text-brand-primary" />
            </div>
            <span className="text-sm font-medium">
              {course.price}
              {course.currency}
            </span>
          </div>
        </div>

        <Button className="w-full">
          <MyLink to={`/courses/${course.id}`}>Details</MyLink>
        </Button>
      </div>
    </div>
  );
}
