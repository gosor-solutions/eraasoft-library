import type { Topic } from "@/types/topic";
import { Link } from "react-router";

export function TopicCard({ topic }: { topic: Topic }) {
  return (
    <Link
      to={`/topics/${topic.id}?name=${encodeURIComponent(topic.name)}`}
      className="flex h-32 items-center justify-center rounded-xl bg-brand-primary/10 p-6 text-center text-lg font-semibold text-foreground transition-colors duration-300 hover:bg-brand-primary hover:text-white"
    >
      {topic.name}
    </Link>
  );
}
