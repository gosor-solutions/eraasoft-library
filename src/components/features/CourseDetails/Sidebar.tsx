import { Loading } from "@/components/shared/Loading";
import { useGetEnrolledRound } from "@/hooks/queries/useLearningQueries";
import type { ActiveContentItem } from "@/pages/CourseDetails";
import type { Lecture } from "@/types/learning";
import {
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  FileText,
  HelpCircle,
  Music,
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
  const courseData = enrolledRoundQuery.data?.data;
  const lectures = courseData?.lectures || [];

  return (
    <aside className="w-full h-full flex flex-col bg-white overflow-hidden">
      {/* Course title */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Course
          </span>
        </div>
        <h2 className="text-sm font-bold text-gray-900 leading-snug">
          {courseData.name}
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {lectures.map((lecture) => {
          const isExpanded = expandedSections.includes(lecture.id);
          // const pct = Math.round((lecture.progress / lecture.total) * 100);

          const items: ActiveContentItem[] = [
            ...(lecture.lecture_videos || []).map((v) => ({
              id: `${v.id}`,
              type: "video" as const,
              title: v.title,
              videoUrl: v.url,
            })),
            // ...(lecture.files || []).map((f) => ({
            //   id: `${f.id}`,
            //   type: "pdf" as const,
            //   title: f.name || "Document",
            //   fileUrl: f.path,
            // })),
            // ...(lecture.quizzes || []).map((q) => ({
            //   id: `${q.id}`,
            //   type: "test" as const,
            //   title: q.name,
            //   testData: q,
            //   completed: q.submitted,
            // })),
          ];

          return (
            <div key={lecture.id}>
              <button
                onClick={() => toggleSection(lecture)}
                className="w-full flex items-center justify-between px-6 py-4 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <div className="flex-1 min-w-0 text-left">
                  <span className="text-sm font-semibold text-gray-800 block truncate">
                    {lecture.name}
                  </span>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                      {/* <div
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      /> */}
                    </div>
                    {/* <span className="text-xs text-gray-400 shrink-0">
                      {section.progress}/{section.total}
                    </span> */}
                  </div>

                  <div className="flex items-center gap-3 ml-3 shrink-0">
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
                </div>
              </button>

              {/* Items */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-[1000px]" : "max-h-0"}`}
              >
                {items.map((item) => {
                  const cfg = typeConfig[item.type] || typeConfig.video;
                  const Icon = cfg.icon;
                  const isActive = activeItemId === item.id;

                  return (
                    <div
                      key={item.id}
                      onClick={() => onItemClick(item)}
                      className={`flex items-start gap-3 px-5 py-3 cursor-pointer transition-all border-l-2 ${
                        isActive
                          ? "bg-blue-50 border-l-blue-500"
                          : "border-l-transparent hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`shrink-0 w-8 h-8 rounded-lg ${isActive ? cfg.bg : "bg-gray-100"} flex items-center justify-center mt-0.5 transition-colors`}
                      >
                        {item.completed ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Icon
                            className={`w-4 h-4 ${isActive ? cfg.color : "text-gray-400"}`}
                          />
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
                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span
                                className={`text-xs font-semibold uppercase tracking-wide ${isActive ? cfg.color : "text-gray-400"}`}
                              >
                                {cfg.label}
                              </span>
                            </div>
                            <p
                              className={`text-sm leading-snug truncate ${isActive ? "text-gray-900 font-medium" : "text-gray-600"}`}
                            >
                              {item.title}
                            </p>
                            {/* <p className="text-xs text-gray-400 mt-0.5">
                              {item.duration}
                            </p> */}
                          </div>
                        </div>
                      </div>
                      <div className="border-b border-gray-100" />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

const typeConfig = {
  video: {
    icon: PlayCircle,
    color: "text-blue-500",
    bg: "bg-blue-50",
    label: "Video",
  },
  article: {
    icon: FileText,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    label: "Article",
  },
  test: {
    icon: HelpCircle,
    color: "text-amber-500",
    bg: "bg-amber-50",
    label: "Test",
  },
  audio: {
    icon: Music,
    color: "text-purple-500",
    bg: "bg-purple-50",
    label: "Audio",
  },
};

export default Sidebar;
