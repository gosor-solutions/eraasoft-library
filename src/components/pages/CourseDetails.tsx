"use client";

import ContentViewer from "@/components/features/CourseDetails/ContentViewer/ContentViewer";
import Sidebar from "@/components/features/CourseDetails/Sidebar";
import { useState } from "react";

const CoursePage = () => {
  // TODO: Add types for activeItem
  const [activeItem, setActiveItem] = useState<any>();

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
