import { CoursesGrid } from "@/components/features/Courses/CoursesGrid";
import { Loading } from "@/components/shared/Loading";
import { NoData } from "@/components/shared/NoData";
import { useGetTopicCourses } from "@/hooks/queries/useTopicQueries";
import { useParams, useSearchParams } from "react-router";

export function TopicCoursesPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const rawName = searchParams.get("name") || "";
  const topicName = rawName ? `${rawName} Courses` : "Topic Courses";

  const coursesQuery = useGetTopicCourses(Number(id));

  let content = null;

  if (coursesQuery.isPending) {
    content = <Loading size={40} color="#000000" />;
  } else if (!coursesQuery.data?.data?.length) {
    content = <NoData data="Courses" />;
  } else {
    content = <CoursesGrid courses={coursesQuery.data.data} />;
  }

  return (
    <section className="w-full px-4 py-8 md:py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-3xl font-bold md:text-4xl">{topicName}</h1>
        {content}
      </div>
    </section>
  );
}
