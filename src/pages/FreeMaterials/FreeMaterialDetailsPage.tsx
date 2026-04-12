import { Button } from "@/components/shared/button";
import { YoutubeEmbed } from "@/components/shared/youtubeEmbed";
import type { FreeMaterial } from "@/types/topic";
import { FiArrowLeft } from "react-icons/fi";
import { Navigate, useLocation, useNavigate } from "react-router";

export function FreeMaterialDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const material = location.state?.material as FreeMaterial | undefined;

  if (!material) {
    return <Navigate to="/free-materials" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="rounded-full px-2"
            >
              <FiArrowLeft size={24} />
            </Button>
            <h1
              className="text-xl font-bold truncate max-w-[60vw]"
              title={material.title}
            >
              {material.title}
            </h1>
          </div>
          <div className="text-sm font-medium px-3 py-1 bg-gray-100 rounded-full capitalize">
            {material.type}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 h-[calc(100vh-80px)]">
        {material.type === "video" ? (
          <div className="w-full h-full max-w-5xl mx-auto bg-black rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
            <YoutubeEmbed url={material.link} title={material.title} />
          </div>
        ) : (
          <div className="w-full h-full bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <iframe
              src={material.link}
              title={material.title}
              className="w-full h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
