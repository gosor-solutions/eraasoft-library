import { useCustomNavigation } from "@/lib/hooks/useCustomNavigation";
import { Clock } from "lucide-react";

const TestViewer = ({ testData }) => {
  const navigate = useCustomNavigation();

  const handleStart = () => {
    navigate("/course-test", { state: { testData } });
  };

  return (
    <div className="w-full min-h-[600px] flex items-center justify-center bg-white">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          <span className="font-normal">Test:</span> {testData.title}
        </h2>
        <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
          <Clock className="w-5 h-5 text-blue-900" />
          <span className="text-lg">{testData.duration}</span>
        </div>
        <p className="text-gray-600 mb-8">
          {testData.questions.length} Questions
        </p>
        <button
          onClick={handleStart}
          className="bg-blue-900 text-white px-16 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default TestViewer;
