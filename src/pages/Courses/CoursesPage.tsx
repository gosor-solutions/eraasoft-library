import { CoursesGrid } from "@/components/features/Courses/CoursesGrid";
import { Loading } from "@/components/shared/Loading";
import { NoData } from "@/components/shared/NoData";

import { useGetTopics } from "@/hooks/queries/useTopicQueries";
import { CourseTypeLabels } from "@/types/course";
import { useSearchParams } from "react-router";

export function CoursesPage() {
  const [params, setParams] = useSearchParams();

  const type = params.get("type");
  const topicId = params.get("category_id"); // Keeping param name for compatibility

  const topicsQuery = useGetTopics({
    ...(type ? { type } : {}),
  });

  if (topicsQuery.isPending) {
    return <Loading size={40} color="#000000" />;
  }

  const allTopics = topicsQuery.data?.data || [];
  
  // Filter topics based on topicId if selected
  const displayTopics = topicId 
    ? allTopics.filter(t => t.id.toString() === topicId)
    : allTopics;

  // Only show topics that have courses
  const topicsWithCourses = displayTopics.filter(t => t.courses && t.courses.length > 0);

  if (!topicsWithCourses.length) {
    return (
      <section className="w-full px-4 py-8 md:py-12">
        <div className="mx-auto max-w-7xl">

        <Header 
          type={type} 
          setParams={setParams} 
          topicId={topicId} 
          topics={allTopics} 
          />
        <NoData data="Courses" />
          </div>
      </section>
    );
  }

  return (
    <>
      <section className="w-full px-4 py-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          <Header
            type={type}
            setParams={setParams}
            topicId={topicId}
            topics={allTopics}
          />

          {topicsWithCourses.map((topic) => (
            <div key={topic.id} className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-gray-800 border-b pb-2">
                {topic.name}
              </h2>
              <CoursesGrid courses={topic.courses!} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Header({
  type,
  setParams,
  topicId,
  topics,
}: {
  type: string | null;
  setParams: (p: URLSearchParams) => void;
  topicId: string | null;
  topics: any[];
}) {
  const handleTopicChange = (value: string) => {
    const newParams = new URLSearchParams(window.location.search);
    if (value === "all") {
      newParams.delete("category_id");
    } else {
      newParams.set("category_id", value);
    }
    newParams.set("page", "1");
    setParams(newParams);
  };

  return (
    <div className="mb-14 flex flex-col items-center gap-10">
      <h1 className="text-3xl font-bold md:text-4xl">{getCourseType(type)}</h1>

      <div className="flex flex-wrap justify-center gap-5">
        <button
          onClick={() => handleTopicChange("all")}
          className={`px-7 py-3 rounded-md text-[15px] font-semibold transition-all duration-300 border-2 ${
            !topicId
              ? "bg-brand-primary text-white border-brand-primary"
              : "bg-white text-gray-700 border-brand-primary/20 hover:border-brand-primary hover:text-brand-primary"
          }`}
        >
          All Topics
        </button>
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => handleTopicChange(topic.id.toString())}
            className={`px-7 py-3 rounded-md text-[15px] font-semibold transition-all duration-300 border-2 ${
              topicId === topic.id.toString()
                ? "bg-brand-primary text-white border-brand-primary"
                : "bg-white text-gray-700 border-brand-primary/20 hover:border-brand-primary hover:text-brand-primary"
            }`}
          >
            {topic.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function getCourseType(type?: string | null) {
  if (!type) return "All Courses";
  const typeNum = parseInt(type);
  return (
    CourseTypeLabels[typeNum as keyof typeof CourseTypeLabels] || "Courses"
  );
}