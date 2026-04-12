import { useCustomNavigation } from "@/lib/hooks/useCustomNavigation";
import { Clock, HelpCircle, ChevronRight } from "lucide-react";

const TestViewer = ({ testData }) => {
  const navigate = useCustomNavigation();

  const handleStart = () => {
    navigate("/course-test", { state: { testData } });
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header band */}
        <div className="bg-amber-50 border-b border-amber-100 px-6 py-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
              Test
            </p>
            <h2 className="text-base font-bold text-gray-900">
              {testData.title}
            </h2>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 divide-x divide-gray-100 border-b border-gray-100">
          <div className="px-6 py-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-gray-500 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wide">
                Duration
              </span>
            </div>
            <p className="text-xl font-bold text-gray-900">
              {testData.duration}
            </p>
          </div>
          <div className="px-6 py-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-gray-500 mb-1">
              <HelpCircle className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wide">
                Questions
              </span>
            </div>
            <p className="text-xl font-bold text-gray-900">
              {testData.questions?.length ?? 0}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 py-5">
          <p className="text-sm text-gray-500 mb-4">
            Make sure you're ready before starting. The timer begins as soon as
            you click Start.
          </p>
          <button
            onClick={handleStart}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Begin Test
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestViewer;
