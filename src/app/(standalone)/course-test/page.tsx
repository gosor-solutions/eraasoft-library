import CourseTest from "@/components/pages/CourseTest";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CourseTest />
    </Suspense>
  );
}
