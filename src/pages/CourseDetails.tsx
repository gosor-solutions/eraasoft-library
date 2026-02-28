import ContentViewer from "@/components/features/CourseDetails/ContentViewer/ContentViewer";
import Sidebar from "@/components/features/CourseDetails/Sidebar";
import { Button } from "@/components/shared/button";
import { Loading } from "@/components/shared/Loading";
import { useGetEnrolledRound } from "@/hooks/queries/useLearningQueries";
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

  const handleItemClick = (item: ActiveContentItem) => {
    if (item.type === "test") {
      navigate(`/course-details/${id}/quiz/${item.id}`);
    } else {
      setActiveItem(item);
    }
  };

  if (enrolledRoundQuery.isPending) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <Loading size={40} color="#000000" />
      </div>
    );
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
    <div className="flex min-h-screen bg-gray-50 ">
      <Sidebar onItemClick={handleItemClick} activeItemId={activeItem?.id} />
      <main className="flex-1 p-8 py-8 ">
        <ContentViewer activeItem={activeItem} />
      </main>
    </div>
  );
};

export default CoursePage;
