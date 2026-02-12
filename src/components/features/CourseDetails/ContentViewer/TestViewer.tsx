"use client";

import { Button } from "@/components/shared/Button";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";

const TestViewer = ({ testData }) => {
  const router = useRouter();

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
        <Button
          onClick={() => {
            sessionStorage.setItem(
              "current_test_data",
              JSON.stringify(testData),
            );
            router.push("/course-test");
          }}
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default TestViewer;
