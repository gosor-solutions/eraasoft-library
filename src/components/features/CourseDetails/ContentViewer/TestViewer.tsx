import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

const TestViewer = ({ testData }) => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!started || submitted) return;

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
  }, [started, submitted]);

  const handleStart = () => {
    setStarted(true);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestion < testData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    let score = 0;
    testData.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    console.log(`Score: ${score}/${testData.questions.length}`);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Start Screen
  if (!started) {
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
  }

  // Results Screen
  if (submitted) {
    const score = testData.questions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correctAnswer ? 1 : 0);
    }, 0);
    const percentage = ((score / testData.questions.length) * 100).toFixed(0);

    return (
      <div className="w-full min-h-[600px] flex items-center justify-center bg-white">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <span className="text-4xl font-bold text-blue-900">
                {percentage}%
              </span>
            </div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">
              Test Completed!
            </h2>
            <p className="text-gray-600 text-lg">
              You got {score} out of {testData.questions.length} questions
              correct
            </p>
          </div>
          <button
            onClick={() => {
              setStarted(false);
              setSubmitted(false);
              setCurrentQuestion(0);
              setAnswers({});
              setTimeLeft(1800);
            }}
            className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium"
          >
            Retake Test
          </button>
        </div>
      </div>
    );
  }

  // Test Screen
  const question = testData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / testData.questions.length) * 100;
  const isLastQuestion = currentQuestion === testData.questions.length - 1;

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header with Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">
              {question.part || "Part 1 - Grammar and vocabulary"}
            </h3>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800 font-medium tabular-nums">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="absolute top-0 left-0 h-2 bg-blue-900 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p className="text-sm text-gray-600">
            {currentQuestion + 1}/{testData.questions.length}
          </p>
        </div>

        {/* Question */}
        <div className="mb-8">
          <p className="text-gray-800 leading-relaxed mb-8 text-base">
            {question.question}
          </p>

          {/* Answer Options */}
          <div className="space-y-3">
            {question.answers.map((answer, index) => {
              const isSelected = answers[question.id] === index;
              return (
                <label
                  key={index}
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? "bg-blue-50 border-blue-900"
                      : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    checked={isSelected}
                    onChange={() => handleAnswerSelect(question.id, index)}
                    className="w-5 h-5 text-blue-900 focus:ring-blue-900 focus:ring-2"
                  />
                  <span className="text-gray-800 text-base">{answer}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6">
          <div className="flex gap-3">
            {!isLastQuestion ? (
              <button
                onClick={handleNext}
                disabled={answers[question.id] === undefined}
                className={`px-10 py-3 rounded-lg font-medium transition-colors ${
                  answers[question.id] !== undefined
                    ? "bg-blue-900 text-white hover:bg-blue-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
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
      </div>
    </div>
  );
};

export default TestViewer;
