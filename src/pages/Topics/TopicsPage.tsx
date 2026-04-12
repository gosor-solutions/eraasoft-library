import { TopicCard } from "@/components/features/Topics/TopicCard";
import { Loading } from "@/components/shared/Loading";
import { NoData } from "@/components/shared/NoData";
import { useGetTopics } from "@/hooks/queries/useTopicQueries";

export function TopicsPage() {
  const topicsQuery = useGetTopics();

  let content = null;

  if (topicsQuery.isPending) {
    content = <Loading size={40} color="#000000" />;
  } else if (!topicsQuery.data?.data?.length) {
    content = <NoData data="Categories" />;
  } else {
    content = (
      <div className="flex flex-col gap-4 mb-12">
        {topicsQuery.data.data.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    );
  }

  return (
    <section className="w-full px-4 py-8 md:py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-3xl font-bold md:text-4xl">Categories</h1>
        {content}
      </div>
    </section>
  );
}
