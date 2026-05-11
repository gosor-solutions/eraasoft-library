
export function DriveEmbed({
  url = "",
  title = "",
}: {
  url?: string;
  title?: string;
  }) {
  
  const match =url.match(/\/d\/([a-zA-Z0-9_-]+)/)
  const videoId = match?.[1]
  const videoUrl =  `https://drive.google.com/file/d/${videoId}/preview`
  
  return (
    <iframe
      src={videoUrl}
      className="absolute top-0 left-0 w-full h-full"
      allowFullScreen
      title={title}
    />
  );
}
