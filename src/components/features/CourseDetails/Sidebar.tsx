import { Loading } from "@/components/shared/Loading";
import { useGetEnrolledRound } from "@/hooks/queries/useLearningQueries";
import type { ActiveContentItem } from "@/pages/CourseDetails";
import type { Lecture } from "@/types/learning";
import {
  CheckCircle,
  ChevronDown,
  ChevronRight,
  FileText,
  HelpCircle,
  PlayCircle,
} from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";

interface SidebarProps {
  onItemClick: (item: ActiveContentItem) => void;
  activeItemId?: string;
}

const Sidebar = ({ onItemClick, activeItemId }: SidebarProps) => {
  const { id } = useParams();
  const enrolledRoundQuery = useGetEnrolledRound(Number(id));
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const toggleSection = (lecture: Lecture) => {
    setExpandedSections((prev) =>
      prev.includes(lecture.id)
        ? prev.filter((id) => id !== lecture.id)
        : [...prev, lecture.id],
    );

    if (lecture.url) {
      onItemClick({
        id: `lecture-main-${lecture.id}`,
        type: "video",
        title: `${lecture.name} (Main Video)`,
        videoUrl: lecture.url,
      });
    }
  };

  const getIcon = (type: string, completed?: boolean) => {
    if (completed) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    switch (type) {
      case "video":
        return <PlayCircle className="w-5 h-5 text-gray-600" />;
      case "article":
      case "pdf":
        return <FileText className="w-5 h-5 text-gray-600" />;
      case "test":
        return <HelpCircle className="w-5 h-5 text-gray-600" />;
      case "audio":
        return <PlayCircle className="w-5 h-5 text-gray-600" />;
      default:
        return <PlayCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  if (enrolledRoundQuery.isPending) {
    return (
      <aside className="w-[30%]">
        <div
          className="sticky bg-white text-white p-4 flex justify-center items-center font-sans border-r border-gray-200"
          style={{ top: "80px", height: `calc(100vh - 80px)` }}
        >
          <Loading size={30} />
        </div>
      </aside>
    );
  }

  const lectures = enrolledRoundQuery.data?.data?.lectures || [];

  return (
    <aside className="w-[30%]">
      <div
        className="sticky bg-white text-white overflow-y-auto font-sans border-r border-gray-200"
        style={{
          top: "80px",
          height: `calc(100vh - 80px)`,
        }}
      >
        {lectures.map((lecture) => {
          const isExpanded = expandedSections.includes(lecture.id);

          const items: ActiveContentItem[] = [
            ...(lecture.lecture_videos || []).map((v) => ({
              id: `${v.id}`,
              type: "video" as const,
              title: v.title,
              videoUrl: v.url,
            })),
            ...(lecture.files || []).map((f) => ({
              id: `${f.id}`,
              type: "pdf" as const,
              title: f.name || "Document",
              fileUrl: f.path,
            })),
            ...(lecture.quizzes || []).map((q) => ({
              id: `${q.id}`,
              type: "test" as const,
              title: q.name,
              testData: q,
              completed: q.submitted,
            })),
          ];

          return (
            <div key={lecture.id} className="border-b border-gray-200">
              <button
                onClick={() => toggleSection(lecture)}
                className="w-full flex items-center justify-between px-6 py-4 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <span className="text-sm font-medium text-gray-800 text-left">
                  {lecture.name}
                </span>
                <div className="flex items-center gap-3">
                  <div
                    className={`transform transition-transform duration-300 ${
                      isExpanded ? "rotate-0" : "rotate-0"
                    }`}
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                </div>
              </button>

              {/* Animated Dropdown */}
              <div
                className={`bg-gray-50 overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded
                    ? "max-h-[2000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onItemClick(item)}
                    className={`flex items-start gap-3 px-6 py-4 hover:bg-gray-200 cursor-pointer transition-colors ${
                      activeItemId === item.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="mt-0.5">
                      {getIcon(
                        item.type,
                        (item as ActiveContentItem).completed,
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-1">
                        <span className="text-sm font-bold text-gray-800 capitalize whitespace-nowrap">
                          {item.type === "pdf" ? "Material" : item.type}:
                        </span>
                        <span className="text-sm text-gray-600 leading-relaxed truncate">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
