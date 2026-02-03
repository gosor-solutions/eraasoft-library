import { Button } from "@/components/shared/button";
import { CourseCard } from "../Courses/CourseCard";

// Main Courses Component
export function CoursesSection() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader />
        <CoursesGrid />
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae
        libero cursus, suscipit risus eget, pretium nulla. Quisqu
      </p>
    </div>
  );
}

// Courses Grid Component
function CoursesGrid() {
  const courses = [
    {
      id: 1,
      name: "Course Name",
      description:
        "a simply dummy text of the printing and typesetting industry. a simply dummy text of the printing and typesetting industry",
      level: "Level A1",
      price: "5000 EGP",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
    },
    {
      id: 2,
      name: "Course Name",
      description:
        "a simply dummy text of the printing and typesetting industry. a simply dummy text of the printing and typesetting industry",
      level: "Level A1",
      price: "5000 EGP",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
    },
    {
      id: 3,
      name: "Course Name",
      description:
        "a simply dummy text of the printing and typesetting industry. a simply dummy text of the printing and typesetting industry",
      level: "Level A1",
      price: "5000 EGP",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
    },
    {
      id: 4,
      name: "Course Name",
      description:
        "a simply dummy text of the printing and typesetting industry. a simply dummy text of the printing and typesetting industry",
      level: "Level A1",
      price: "5000 EGP",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
    },
    {
      id: 5,
      name: "Course Name",
      description:
        "a simply dummy text of the printing and typesetting industry. a simply dummy text of the printing and typesetting industry",
      level: "Level A1",
      price: "5000 EGP",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
    },
    {
      id: 6,
      name: "Course Name",
      description:
        "a simply dummy text of the printing and typesetting industry. a simply dummy text of the printing and typesetting industry",
      level: "Level A1",
      price: "5000 EGP",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}