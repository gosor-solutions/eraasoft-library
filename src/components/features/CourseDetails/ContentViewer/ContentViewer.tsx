import VideoPlayer from "./VideoPlayer";
import TestViewer from "./TestViewer";
import ArticleViewer from "./ArticleViewer";
import AudioPlayer from "./AudioPlayer";

const ContentViewer = ({ activeItem }) => {
  if (!activeItem) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <p>Select an item from the sidebar to view content</p>
      </div>
    );
  }

  switch (activeItem.type) {
    case "video":
      return <VideoPlayer videoData={activeItem} />;
    case "test":
      return <TestViewer testData={activeItem} />;
    case "article":
      return <ArticleViewer articleData={activeItem} />;
    case "audio":
      return <AudioPlayer audioData={activeItem} />;
    default:
      return <p>Unsupported content type</p>;
  }
};

export default ContentViewer;
