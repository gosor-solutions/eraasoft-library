// components/ContentViewer/VideoPlayer.jsx

const VideoPlayer = ({ videoData }) => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Video iframe */}
      <div
        className="relative w-full bg-black rounded-lg overflow-hidden shadow-lg"
        style={{ paddingBottom: "56.25%" }}
      >
        <iframe
          src={videoData.videoUrl}
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={videoData.title}
        />
      </div>

      {/* Captions Section */}
      <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Captions</h3>
        <div className="text-gray-600 leading-relaxed space-y-3 text-[15px]">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum is simply dummy text
            of the printing and typesetting industry. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry.
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum is simply dummy text
            of the printing and typesetting industry.
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
