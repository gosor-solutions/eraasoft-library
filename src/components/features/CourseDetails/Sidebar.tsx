import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  PlayCircle,
  FileText,
  HelpCircle,
  CheckCircle,
  BookOpen,
  Music,
} from "lucide-react";

const courseData = {
  title: "English Course — Adults",
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      progress: 2,
      total: 5,
      items: [
        {
          id: "intro-video-1",
          type: "video",
          title: "Introduction Video Title",
          duration: "10 min",
          completed: true,
          videoUrl: "https://example.com/video1.mp4",
        },
        {
          id: "intro-article-1",
          type: "article",
          title: "Introduction Article Title",
          duration: "5 min",
          completed: false,
          content: "Article content here...",
        },
      ],
    },
    {
      id: "course-overview",
      title: "Course Overview",
      progress: 3,
      total: 10,
      items: [
        {
          id: "overview-video-1",
          type: "video",
          title: "Video Title — Lesson One",
          duration: "15 min",
          completed: true,
          videoUrl:
            "https://www.youtube.com/embed/JQT8d2tHwk0?si=M1GTf-Zg_7lT16j1",
        },
        {
          id: "overview-video-2",
          type: "video",
          title: "Video Title — Lesson Two",
          duration: "15 min",
          completed: false,
          videoUrl: "https://example.com/video3.mp4",
        },
        {
          id: "overview-article-1",
          type: "article",
          title: "Reading Comprehension Guide",
          duration: "15 min",
          completed: false,
          content: "Article content...",
        },
        {
          id: "overview-test-1",
          type: "test",
          title: "Grammar and Vocabulary Test",
          duration: "30 min",
          completed: false,
          questions: [
            {
              id: "q1",
              part: "Part 1 - Grammar and vocabulary",
              question:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
              answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
              correctAnswer: 0,
            },
            {
              id: "q2",
              part: "Part 1 - Grammar and vocabulary",
              question:
                "Choose the correct form: She ___ to the store yesterday.",
              answers: ["go", "goes", "went", "going"],
              correctAnswer: 2,
            },
            {
              id: "q3",
              part: "Part 1 - Grammar and vocabulary",
              question: "What is the synonym of 'beautiful'?",
              answers: ["Ugly", "Pretty", "Sad", "Angry"],
              correctAnswer: 1,
            },
            {
              id: "q4",
              part: "Part 1 - Grammar and vocabulary",
              question: "Which sentence is grammatically correct?",
              answers: [
                "He don't like pizza",
                "He doesn't likes pizza",
                "He doesn't like pizza",
                "He not like pizza",
              ],
              correctAnswer: 2,
            },
            {
              id: "q5",
              part: "Part 2 - Reading comprehension",
              question: "According to the passage, what is the main idea?",
              answers: [
                "Technology is important",
                "Education matters",
                "Health is wealth",
                "Time is money",
              ],
              correctAnswer: 1,
            },
            {
              id: "q6",
              part: "Part 2 - Reading comprehension",
              question: "Which statement is true based on the text?",
              answers: [
                "Statement A",
                "Statement B",
                "Statement C",
                "Statement D",
              ],
              correctAnswer: 0,
            },
            {
              id: "q7",
              part: "Part 3 - Vocabulary",
              question: "What does 'ubiquitous' mean?",
              answers: ["Rare", "Present everywhere", "Dangerous", "Beautiful"],
              correctAnswer: 1,
            },
            {
              id: "q8",
              part: "Part 3 - Vocabulary",
              question: "Choose the antonym of 'difficult'.",
              answers: ["Hard", "Challenging", "Easy", "Complex"],
              correctAnswer: 2,
            },
          ],
        },
        {
          id: "overview-audio-1",
          type: "audio",
          title: "Audio Lesson — Pronunciation",
          duration: "20 min",
          completed: false,
          audioUrl: "https://example.com/audio1.mp3",
        },
      ],
    },
  ],
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

const Sidebar = ({ onItemClick, activeItemId }) => {
  const [expandedSections, setExpandedSections] = useState([]);

  const toggleSection = (id) =>
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );

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
          {courseData.title}
        </h2>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto">
        {courseData.sections.map((section) => {
          const isExpanded = expandedSections.includes(section.id);
          const pct = Math.round((section.progress / section.total) * 100);

          return (
            <div key={section.id}>
              {/* Section header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex-1 min-w-0 text-left">
                  <span className="text-sm font-semibold text-gray-800 block truncate">
                    {section.title}
                  </span>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 shrink-0">
                      {section.progress}/{section.total}
                    </span>
                  </div>
                </div>
                <div className="ml-3 shrink-0">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Items */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-[1000px]" : "max-h-0"}`}
              >
                {section.items.map((item) => {
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
                      {/* Icon */}
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
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item.duration}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="border-b border-gray-100" />
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
