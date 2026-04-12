import { useNavigate } from "react-router";

type RoundCardProps = {
  id: number;
  title: string;
  image?: string;
};

export function RoundCard({ id, title, image }: RoundCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/course-details/${id}`)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300 flex flex-col"
    >
      <div className="h-40 w-full bg-gray-100 relative">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-4xl text-brand-primary/20 font-bold">📚</span>
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex items-center justify-center">
        <h3 className="font-semibold text-gray-800 text-center line-clamp-2">
          {title}
        </h3>
      </div>
    </div>
  );
}
