import { SingleCoursePage } from "@/components/pages/Courses/SingleCoursePage";

export default async function Page({}: { params: Promise<{ id: string }> }) {
  // const { id } = await params;
  return <SingleCoursePage />;
}
