import { Button } from "@/components/shared/button";

export function WhatWillYouLearn() {
  const courses = [
    {
      title: "English Course",
      description: [
        "Your journey in UI/UX design starts here.",
        "Fast-track your learning and nail your interviews.",
        "Build job-ready skills at your own pace.",
      ],
    },
    {
      title: "English Course",
      description: [
        "Your journey in UI/UX design starts here.",
        "Fast-track your learning and nail your interviews.",
        "Build job-ready skills at your own pace.",
      ],
    },
    {
      title: "English Course",
      description: [
        "Your journey in UI/UX design starts here.",
        "Fast-track your learning and nail your interviews.",
        "Build job-ready skills at your own pace.",
      ],
    },
  ];

  return (
    <section className="w-full px-4 py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Title */}
        <h2 className="mb-8 text-3xl font-bold md:text-4xl lg:mb-12">
          What you'll learn
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <LearnCard key={index} index={index + 1} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
function LearnCard({
  index,
  course,
}: {
  index: number;
  course: { title: string; description: string[] };
}) {
  return (
    <div
      key={index}
      className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Decorative Circle Background */}
      <div className="absolute -right-4 -top-10 text-[250px] font-extrabold text-brand-primary/10 ">
        {index}
      </div>

      {/* Card Content */}
      <div className="relative z-10">
        {/* Title */}
        <h3 className="mb-4 text-xl font-bold">{course.title}</h3>

        {/* Description */}
        <div className="mb-6 space-y-2 max-w-3/4">
          {course.description.map((text, idx) => (
            <p key={idx} className="text-sm text-brand-gray">
              {text}
            </p>
          ))}
        </div>

        <Button variant="link">courses content</Button>
      </div>
    </div>
  );
}
