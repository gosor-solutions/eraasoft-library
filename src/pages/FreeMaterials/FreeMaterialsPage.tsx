import { Loading } from "@/components/shared/Loading";
import { useGetFreeMaterials } from "@/hooks/queries/useTopicQueries";
import type { FreeMaterial } from "@/types/topic";
import { useState } from "react";
import {
  FiChevronDown,
  FiChevronRight,
  FiFileText,
  FiVideo,
} from "react-icons/fi";
import { Link } from "react-router";

function MaterialItem({ material }: { material: FreeMaterial }) {
  return (
    <Link
      to={`/free-materials/${material.id}`}
      state={{ material }}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100 bg-white"
    >
      <div className="shrink-0 text-brand-primary">
        {material.type === "video" ? (
          <FiVideo size={20} />
        ) : (
          <FiFileText size={20} />
        )}
      </div>
      <div className="flex-1 font-medium text-gray-800">{material.title}</div>
    </Link>
  );
}

export function FreeMaterialsPage() {
  const { data: response, isLoading } = useGetFreeMaterials();
  const [expandedSubjects, setExpandedSubjects] = useState<
    Record<number, boolean>
  >({});

  const toggleSubject = (subjectId: number) => {
    setExpandedSubjects((prev) => ({
      ...prev,
      [subjectId]: !prev[subjectId],
    }));
  };

  if (isLoading) {
    return <Loading />;
  }

  const subjects = response?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Free Materials</h1>

      {subjects.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No free materials available yet.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {subjects.map((subject) => {
            const isExpanded = expandedSubjects[subject.id];

            return (
              <div key={subject.id} className=" overflow-hidden bg-white">
                <button
                  onClick={() => toggleSubject(subject.id)}
                  className="border-b-2 border-brand-primary w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors text-left"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {subject.title}
                    </h2>
                    {subject.course && (
                      <p className="text-sm text-gray-500 mt-1">
                        {subject.course.title}
                      </p>
                    )}
                  </div>
                  <div className="text-gray-500">
                    {isExpanded ? (
                      <FiChevronDown size={24} />
                    ) : (
                      <FiChevronRight size={24} />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-4 bg-white border-t border-gray-100">
                    {subject.free_materials &&
                    subject.free_materials.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {subject.free_materials.map((material) => (
                          <MaterialItem key={material.id} material={material} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 italic py-2">
                        No materials available for this subject.
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
