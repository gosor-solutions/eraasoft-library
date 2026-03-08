interface PdfViewerProps {
  pdfData?: {
    title?: string;
    fileUrl?: string;
  };
}

const PdfViewer = ({ pdfData }: PdfViewerProps) => {
  if (!pdfData?.fileUrl) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>No PDF document available.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto h-[80vh] bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      <h3 className="text-xl font-semibold text-gray-800 p-4 border-b border-gray-100">
        {pdfData.title || "Document"}
      </h3>

      <div className="flex-1 w-full bg-gray-100">
        <iframe
          src={pdfData.fileUrl}
          className="w-full h-full"
          title={pdfData.title || "PDF Document"}
        />
      </div>
    </div>
  );
};

export default PdfViewer;
