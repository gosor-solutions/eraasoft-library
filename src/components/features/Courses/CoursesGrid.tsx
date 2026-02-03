import { CourseCard } from "@/components/features/Courses/CourseCard";

// Courses Grid Component
export function CoursesGrid() {
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
