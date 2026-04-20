import { CoursesGrid } from "@/components/features/Courses/CoursesGrid";
import { Loading } from "@/components/shared/Loading";
import { NoData } from "@/components/shared/NoData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/select";
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
      <>
        <Header 
          type={type} 
          setParams={setParams} 
          topicId={topicId} 
          topics={allTopics} 
        />
        <NoData data="Courses" />
      </>
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
    <div className="mb-8 px-6 mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <h1 className="text-3xl font-bold md:text-4xl">{getCourseType(type)}</h1>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
          Filter by Topic:
        </span>
        <Select
          value={topicId || "all"}
          onValueChange={handleTopicChange}
        >
          <SelectTrigger className="w-[200px] bg-white">
            <SelectValue placeholder="All Topics" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Topics</SelectItem>
            {topics.map((topic) => (
              <SelectItem key={topic.id} value={topic.id.toString()}>
                {topic.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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