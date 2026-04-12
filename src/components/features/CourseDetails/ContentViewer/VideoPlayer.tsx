import { YoutubeEmbed } from "@/components/shared/youtubeEmbed";

const VideoPlayer = ({
  videoData,
}: {
  videoData: {
    videoUrl: string;
    title: string;
  };
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div
        className="relative w-full bg-black rounded-lg overflow-hidden shadow-lg"
        style={{ paddingBottom: "56.25%" }}
      >
        <YoutubeEmbed url={videoData?.videoUrl} title={videoData?.title} />
      </div>
    </div>
  );
};

export default VideoPlayer;
