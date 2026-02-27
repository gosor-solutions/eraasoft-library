import type { Course } from "@/types/course";

export function WhatWillYouLearn({
  learn,
}: {
  learn: Course["what_you_will_learn"];
}) {
  return (
    <section className="w-full px-4 py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Title */}
        <h2 className="mb-8 text-3xl font-bold md:text-4xl lg:mb-12">
          What you'll learn
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {learn.map((text, index) => (
            <LearnCard key={index} index={index + 1} text={text} />
          ))}
        </div>
      </div>
    </section>
  );
}
function LearnCard({ index, text }: { index: number; text: string }) {
  return (
    <div
      key={index}
      className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Decorative Circle Background */}
      <div className="absolute -right-4 -top-16  text-[200px] font-extrabold text-brand-primary/10 ">
        {index}
      </div>

      {/* Card Content */}
      <div className="relative z-10 ">
        {/* Title */}
        {/* <h3 className="mb-4 text-xl font-bold">{course.title}</h3> */}

        {/* Description */}
        <div className="mb-6 space-y-2 max-w-3/4 min-h-24 flex flex-col justify-center">
          {text}
        </div>

        {/* <Button variant="link">courses content</Button> */}
      </div>
    </div>
  );
}
