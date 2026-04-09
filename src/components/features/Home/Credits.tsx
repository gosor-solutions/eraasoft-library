import { useGetCredits } from "@/hooks/queries/useAboutUsQueries";

export function Credits() {
  const { data: credits = [] } = useGetCredits();

  if (credits.length === 0) return null;

  const fullUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/api\/?$/, "") || "";
    return `${baseUrl}/storage/${path.replace(/^\/+/, "")}`;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 text-center mb-12">
          Accredited by
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-8">
          {credits.map((item, idx) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-xl flex justify-center items-center"
            >
              <img
                src={fullUrl(item.image_path)}
                alt={item.name || `Credit image ${idx}`}
                className="max-w-[250px] w-full h-auto rounded-xl object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
