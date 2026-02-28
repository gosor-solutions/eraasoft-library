import PdfViewer from "./PdfViewer";
import TestViewer from "./TestViewer";
import VideoPlayer from "./VideoPlayer";

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
    // case "audio":
    //   return <AudioPlayer audioData={activeItem} />;
    case "pdf":
      return <PdfViewer pdfData={activeItem} />;
    default:
      return <p>Unsupported content type</p>;
  }
};

export default ContentViewer;
