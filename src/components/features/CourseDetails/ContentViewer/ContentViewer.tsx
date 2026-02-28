import { MousePointerClick } from "lucide-react";
import ArticleViewer from "./ArticleViewer";
import AudioPlayer from "./AudioPlayer";
import PdfViewer from "./PdfViewer";
import TestViewer from "./TestViewer";
import VideoPlayer from "./VideoPlayer";

const ContentViewer = ({ activeItem }) => {
  if (!activeItem) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center px-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
          <MousePointerClick className="w-7 h-7 text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">
          Pick a lesson to start
        </h3>
        <p className="text-sm text-gray-400 max-w-xs">
          Select any item from the course sidebar to begin learning
        </p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300">
      {(() => {
        switch (activeItem.type) {
          case "video":
            return <VideoPlayer videoData={activeItem} />;
          case "test":
            return <TestViewer testData={activeItem} />;
          case "article":
            return <ArticleViewer articleData={activeItem} />;
          case "pdf":
            return <PdfViewer pdfData={activeItem} />;
          case "audio":
            return <AudioPlayer audioData={activeItem} />;
          default:
            return <p className="text-gray-400">Unsupported content type</p>;
        }
      })()}
    </div>
  );
};

export default ContentViewer;
