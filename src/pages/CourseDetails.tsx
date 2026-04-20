import ContentViewer from "@/components/features/CourseDetails/ContentViewer/ContentViewer";
import Sidebar from "@/components/features/CourseDetails/Sidebar";

import { Button } from "@/components/shared/button";
import { Loading } from "@/components/shared/Loading";
import { useGetEnrolledRound } from "@/hooks/queries/useLearningQueries";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

export interface ActiveContentItem {
  id: string;
  type: "video" | "pdf" | "test";
  title?: string;
  videoUrl?: string;
  fileUrl?: string;
  testData?: unknown;
  completed?: boolean;
}

const CoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const enrolledRoundQuery = useGetEnrolledRound(Number(id));

  const [activeItem, setActiveItem] = useState<ActiveContentItem | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleItemClick = (item: ActiveContentItem) => {
    if (item.type === "test") {
      navigate(`/course-details/${id}/quiz/${item.id}`);
    } else {
      setActiveItem(item);
    }
    setSidebarOpen(false);
  };

  if (enrolledRoundQuery.isPending) {
    return <Loading fullScreen />;
  }

  if (enrolledRoundQuery.isError || !enrolledRoundQuery.data) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 items-center justify-center space-y-4">
        <p className="text-xl font-semibold text-gray-800">
          Round not found or an error occurred.
        </p>
        <Button onClick={() => navigate("/")}>Go back to Home Page</Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8f9fc]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-16 left-0 h-[calc(100vh-64px)] z-30 w-72 bg-white shadow-2xl
        transform transition-transform duration-300 ease-in-out
        lg:static lg:transform-none lg:shadow-none lg:z-auto lg:h-auto lg:w-[300px] xl:w-[320px]
        border-r border-gray-100
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <Sidebar onItemClick={handleItemClick} activeItemId={activeItem?.id} />
      </div>

      {/* Main */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <div className="sticky top-16 z-10 bg-white/80 backdrop-blur border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
          >
            {sidebarOpen ? (
              <PanelLeftClose className="w-4 h-4" />
            ) : (
              <PanelLeftOpen className="w-4 h-4" />
            )}
            Course Content
          </button>
          {activeItem && (
            <span className="text-sm text-gray-500 truncate">
              {activeItem.title}
            </span>
          )}
        </div>

        {/* Content area */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-10">
          <ContentViewer activeItem={activeItem} />
        </div>
      </main>
    </div>
  );
};

export default CoursePage;
