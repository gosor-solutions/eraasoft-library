import ConfirmExitModal from "@/components/features/CourseDetails/ConfirmExitModal";
import { useSubmitQuiz } from "@/hooks/mutations/useQuizMutations";
import { useGetQuiz } from "@/hooks/queries/useQuizQueries";
import { useCustomNavigation } from "@/lib/hooks/useCustomNavigation";
import { ChevronLeft, Loader2, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useBlocker, useParams } from "react-router";

const CourseTest = () => {
  const navigate = useCustomNavigation();
  const { quizId } = useParams();

  const quizQuery = useGetQuiz(Number(quizId));
  const submitQuizMutation = useSubmitQuiz(Number(quizId));

  const quizData = quizQuery.data?.data;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<
    Array<{ question_id: number; option_id: number }>
  >([]);
  const [submitted, setSubmitted] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  // Only block when we haven't explicitly allowed navigation
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (submitted) return false;
    return currentLocation.pathname !== nextLocation.pathname;
  });

  if (blocker.state === "blocked" && !showExitModal) {
    setShowExitModal(true);
  }

  const handleConfirmExit = () => {
    setShowExitModal(false);
    blocker.proceed?.();
  };

  const handleCancelExit = () => {
    setShowExitModal(false);
    blocker.reset?.();
  };

  const handleExitClick = () => {
    navigate(-1);
  };

  const handleAnswerSelect = (questionId: number, optionId: number) => {
    setAnswers((prev) => [
      ...prev,
      { question_id: questionId, option_id: optionId },
    ]);
  };

  const handleNext = () => {
    if (
      quizData?.questions &&
      currentQuestion < quizData.questions.length - 1
    ) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = useCallback(() => {
    const formattedAnswers = answers.map((answer) => ({
      question_id: answer.question_id,
      option_id: answer.option_id,
    }));

    submitQuizMutation.mutate(
      { answers: formattedAnswers },
      {
        onSuccess: () => {
          setSubmitted(true);
        },
      },
    );
  }, [answers, submitQuizMutation]);

  if (quizQuery.isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-900" />
      </div>
    );
  }

  if (quizQuery.isError || !quizData) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Error loading test
        </h2>
        <p className="text-gray-600 mb-6">
          We couldn't load the test data. Please try again.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Results Screen
  if (submitted && submitQuizMutation.isSuccess) {
    const submission = submitQuizMutation.data?.data;
    const score = submission.correct_answers_count || 0;
    const total =
      submission?.total_questions || quizData.questions?.length || 0;
    const percentage = submission?.score.toFixed(0);

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
              You got {score} out of {total} questions correct
            </p>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setSubmitted(false);
                setCurrentQuestion(0);
                setAnswers([]);
                submitQuizMutation.reset();
              }}
              className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium"
            >
              Retake Test
            </button>
            <button
              onClick={() => navigate(-1)}
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
  const question = quizData.questions?.[currentQuestion];
  const progress =
    ((currentQuestion + 1) / (quizData.questions?.length || 1)) * 100;
  const isLastQuestion =
    currentQuestion === (quizData.questions?.length || 1) - 1;

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header Bar */}
        <div className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-10">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {quizData.title}
                </h2>
                <span className="text-sm text-gray-500">
                  Question {currentQuestion + 1} of{" "}
                  {quizData.questions?.length || 0}
                </span>
              </div>

              <div className="flex items-center gap-6">
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
          {/* Question */}
          <div className="mb-10">
            <p className="text-gray-800 leading-relaxed text-lg mb-8">
              {question?.question_content}
            </p>

            {/* Answer Options */}
            <div className="space-y-4">
              {question?.options?.map((option) => {
                const isSelected =
                  answers.find((answer) => answer.question_id === question.id)
                    ?.option_id === option.id;
                return (
                  <label
                    key={option.id}
                    className={`flex items-center gap-4 p-5 border-2 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? "bg-blue-50 border-blue-900 shadow-md"
                        : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      checked={isSelected}
                      onChange={() =>
                        handleAnswerSelect(question.id, option.id)
                      }
                      className="w-5 h-5 text-blue-900 focus:ring-blue-900 focus:ring-2"
                    />
                    <span className="text-gray-800 text-base flex-1">
                      {option.option_content}
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
                  disabled={submitQuizMutation.isPending}
                  className="flex items-center justify-center bg-green-600 text-white px-10 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {submitQuizMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Test"
                  )}
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
              {quizData.questions?.map((q, index) => (
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
                  title={`Question ${index + 1}${
                    answers[q.id] !== undefined ? " (Answered)" : ""
                  }`}
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
