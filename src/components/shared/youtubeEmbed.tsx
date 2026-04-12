import { extractYoutubeVideoId } from "@/helpers/videoHelpers";

export function YoutubeEmbed({
  url = "",
  title = "",
}: {
  url?: string;
  title?: string;
}) {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${extractYoutubeVideoId(url)}`}
      className="absolute top-0 left-0 w-full h-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={title}
    />
  );
}
