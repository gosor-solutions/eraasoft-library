import { DriveEmbed } from "@/components/shared/driveEmbed";

const VideoPlayer = ({
  videoData,
}: {
  videoData: {
    videoUrl: string;
    title: string;
  };
  }) => {
  
    console.log(videoData);
    
  
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div
        className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg"
      >
        <DriveEmbed url={videoData?.videoUrl} title={videoData?.title} />
      </div>
    </div>
  );
};

export default VideoPlayer;
