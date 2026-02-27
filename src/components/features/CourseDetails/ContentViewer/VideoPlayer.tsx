const VideoPlayer = ({ videoData }) => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* 16:9 responsive iframe */}
      <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-lg aspect-video">
        <iframe
          src={videoData.videoUrl}
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={videoData.title}
        />
      </div>

      {/* Title */}
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mt-4 px-1">
        {videoData.title}
      </h2>

      {/* Captions */}
      <div className="mt-4 bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
        <h3 className="text-base sm:text-xl font-semibold text-gray-800 mb-3">
          Captions
        </h3>
        <div className="text-gray-600 leading-relaxed space-y-3 text-sm sm:text-[15px]">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry.
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry.
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
