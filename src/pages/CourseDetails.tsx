import { useState } from "react";
import ContentViewer from "@/components/features/CourseDetails/ContentViewer/ContentViewer";
import Sidebar from "@/components/features/CourseDetails/Sidebar";

const CoursePage = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 ">
      <Sidebar onItemClick={handleItemClick} activeItemId={activeItem?.id} />
      <main className="flex-1 p-8 py-30 ">
        <ContentViewer activeItem={activeItem} />
      </main>
    </div>
  );
};

export default CoursePage;
