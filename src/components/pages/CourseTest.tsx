"use client";

import ConfirmExitModal from "@/components/features/CourseDetails/ConfirmExitModal";
import { ChevronLeft, Clock, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const CourseTest = () => {
  const router = useRouter();

  const [testData, setTestData] = useState<any>({ questions: [], title: "" });
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(1800);
  const [submitted, setSubmitted] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  // Load test data from sessionStorage
  useEffect(() => {
    const savedData = sessionStorage.getItem("current_test_data");
    if (savedData) {
      try {
        setTestData(JSON.parse(savedData));
      } catch (e) {
        console.error("Error parsing test data", e);
        router.back();
      }
    } else {
      router.back();
    }
  }, [router]);

  // Navigation Prevention Logic
  useEffect(() => {
    if (submitted || !testData) return;

    // 1. Prevent Tab Close / Refresh (Native Browser Alert)
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    // 2. Prevent Back Button (Intercept popstate)
    // We push a dummy state so that when user clicks back, it pops THIS state
    // and we can catch it, push it back, and show our modal.
    window.history.pushState(null, "", window.location.href);

    const handlePopState = (e: PopStateEvent) => {
      // If we are not submitted, block navigation
      if (!submitted) {
        window.history.pushState(null, "", window.location.href);
        setShowExitModal(true);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [submitted, testData]);

  const handleConfirmExit = () => {
    setShowExitModal(false);
    // Explicitly allow navigation by using a flag or just navigating
    // Since we want to exit, we can just go back
    // But we need to make sure we don't trigger the popstate guard again
    // For simplicity, we'll just redirect
    window.location.href = "/course-details"; // Hard redirect to break out
  };

  const handleCancelExit = () => {
    setShowExitModal(false);
  };

  const handleExitClick = () => {
    setShowExitModal(true);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestion < testData?.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    let score = 0;
    testData?.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    console.log(`Score: ${score}/${testData?.questions.length}`);
  }, [answers, testData?.questions]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Redirect if no test data
  useEffect(() => {
    if (!testData) {
      router.back();
    }
  }, [testData, router]);

  // Timer
  useEffect(() => {
    if (submitted || !testData) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [submitted, testData, handleSubmit]);

  if (!testData) {
    return null;
  }
  // Results Screen
  if (submitted) {
    const score = testData?.questions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correctAnswer ? 1 : 0);
    }, 0);
    const percentage = ((score / testData?.questions.length) * 100).toFixed(0);

    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-6">
              <span className="text-4xl font-bold text-blue-900">
                {percentage}%
              </span>
            </div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-3">
              Test Completed!
            </h2>
            <p className="text-gray-600 text-lg">
              You got {score} out of {testData?.questions.length} questions
              correct
            </p>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setSubmitted(false);
                setCurrentQuestion(0);
                setAnswers({});
                setTimeLeft(1800);
              }}
              className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium"
            >
              Retake Test
            </button>
            <button
              onClick={() => router.back()}
              className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Back to Course
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Test Screen
  const question = testData?.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / testData?.questions.length) * 100;
  const isLastQuestion = currentQuestion === testData?.questions.length - 1;

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header Bar */}
        <div className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-10">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {testData?.title}
                </h2>
                <span className="text-sm text-gray-500">
                  Question {currentQuestion + 1} of {testData?.questions.length}
                </span>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-800 font-medium tabular-nums">
                    {formatTime(timeLeft)}
                  </span>
                </div>

                <button
                  onClick={handleExitClick}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  title="Exit Test"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="relative w-full bg-gray-200 rounded-full h-2">
                <div
                  className="absolute top-0 left-0 h-2 bg-blue-900 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Part Title */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              {question?.part || "Part 1 - Grammar and vocabulary"}
            </h3>
          </div>

          {/* Question */}
          <div className="mb-10">
            <p className="text-gray-800 leading-relaxed text-lg mb-8">
              {question?.question}
            </p>

            {/* Answer Options */}
            <div className="space-y-4">
              {question?.answers.map((answer, index) => {
                const isSelected = answers[question?.id] === index;
                return (
                  <label
                    key={index}
                    className={`flex items-center gap-4 p-5 border-2 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? "bg-blue-50 border-blue-900 shadow-md"
                        : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${question?.id}`}
                      checked={isSelected}
                      onChange={() => handleAnswerSelect(question?.id, index)}
                      className="w-5 h-5 text-blue-900 focus:ring-blue-900 focus:ring-2"
                    />
                    <span className="text-gray-800 text-base flex-1">
                      {answer}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                currentQuestion === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="flex gap-3">
              {!isLastQuestion ? (
                <button
                  onClick={handleNext}
                  className="bg-blue-900 text-white px-10 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 text-white px-10 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Submit Test
                </button>
              )}
            </div>
          </div>

          {/* Question Navigator */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-4">
              Question Navigator:
            </p>
            <div className="flex flex-wrap gap-2">
              {testData?.questions.map((q, index) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-12 h-12 rounded-lg font-medium transition-all ${
                    index === currentQuestion
                      ? "bg-blue-900 text-white ring-2 ring-blue-400"
                      : answers[q.id] !== undefined
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  title={`Question ${index + 1}${answers[q.id] !== undefined ? " (Answered)" : ""}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      <ConfirmExitModal
        isOpen={showExitModal}
        onConfirm={handleConfirmExit}
        onCancel={handleCancelExit}
      />
    </>
  );
};

export default CourseTest;
