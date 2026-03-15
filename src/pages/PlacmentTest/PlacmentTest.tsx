"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Option {
  id: number;
  option_content: string;
  is_correct: number;
}

interface Question {
  id: number;
  question_type: number; // 1 = MCQ, 3 = reading passage
  question_content: string;
  listening_content: string | null;
  answer_writing: string | null;
  category: { id: number; name: string; order: number; question_count: number };
  tag: { id: number; name: string };
  options: Option[];
  case: string | null;
}

interface ApiData {
  listening: string;
  reading: string;
  case: string;
  time_of_exam: string;
  questions_count: number;
  questions: Question[];
}

// ─── Mock API Response (replace with real fetch) ──────────────────────────────

// const API_RESPONSE: ApiData = {
//   listening: "5",
//   reading: "5",
//   case: "5",
//   time_of_exam: "60",
//   questions_count: 50,
//   questions: [
//     {
//       id: 208,
//       question_type: 1,
//       question_content: "Which one is an animal?",
//       listening_content: null,
//       answer_writing: null,
//       category: { id: 1, name: "A1", order: 1, question_count: 60 },
//       tag: { id: 2, name: "Vocabulary", created_at: "", updated_at: "" } as any,
//       options: [
//         { id: 829, option_content: "elephant", is_correct: 1 },
//         { id: 830, option_content: "table", is_correct: 0 },
//         { id: 831, option_content: "carrot", is_correct: 0 },
//         { id: 832, option_content: "shirt", is_correct: 0 },
//       ],
//       case: null,
//     },
//     {
//       id: 120,
//       question_type: 1,
//       question_content: "I want ___ apple.",
//       listening_content: null,
//       answer_writing: null,
//       category: { id: 1, name: "A1", order: 1, question_count: 60 },
//       tag: { id: 1, name: "Grammar" } as any,
//       options: [
//         { id: 477, option_content: "the", is_correct: 0 },
//         { id: 478, option_content: "an", is_correct: 1 },
//         { id: 479, option_content: "some", is_correct: 0 },
//         { id: 480, option_content: "a", is_correct: 0 },
//       ],
//       case: null,
//     },
//     {
//       id: 219,
//       question_type: 1,
//       question_content: "They ___ at home today.",
//       listening_content: null,
//       answer_writing: null,
//       category: { id: 1, name: "A1", order: 1, question_count: 60 },
//       tag: { id: 1, name: "Grammar" } as any,
//       options: [
//         { id: 873, option_content: "is", is_correct: 0 },
//         { id: 874, option_content: "are", is_correct: 1 },
//         { id: 875, option_content: "am", is_correct: 0 },
//         { id: 876, option_content: "were", is_correct: 0 },
//       ],
//       case: null,
//     },
//     {
//       id: 14,
//       question_type: 3,
//       question_content: "How old is Anna?",
//       listening_content: null,
//       answer_writing: null,
//       category: { id: 1, name: "A1", order: 1, question_count: 60 },
//       tag: { id: 2, name: "Vocabulary" } as any,
//       options: [
//         { id: 53, option_content: "Five", is_correct: 0 },
//         { id: 54, option_content: "Six", is_correct: 1 },
//         { id: 55, option_content: "Seven", is_correct: 0 },
//         { id: 56, option_content: "Eight", is_correct: 0 },
//       ],
//       case: "Anna is six years old. She has a dog called Max. Anna likes to draw pictures in her notebook.",
//     },
//     {
//       id: 214,
//       question_type: 3,
//       question_content: "What animals does Mia have?",
//       listening_content: null,
//       answer_writing: null,
//       category: { id: 1, name: "A1", order: 1, question_count: 60 },
//       tag: { id: 2, name: "Vocabulary" } as any,
//       options: [
//         { id: 853, option_content: "Three cats", is_correct: 0 },
//         { id: 854, option_content: "Two cats and one bird", is_correct: 1 },
//         { id: 855, option_content: "One cat and two birds", is_correct: 0 },
//         { id: 856, option_content: "Only a bird", is_correct: 0 },
//       ],
//       case: "Mia has two cats and one bird. She feeds them every morning before school. She loves animals.",
//     },
//     {
//       id: 227,
//       question_type: 1,
//       question_content: 'What is a "menu"?',
//       listening_content: null,
//       answer_writing: null,
//       category: { id: 3, name: "A2", order: 3, question_count: 60 },
//       tag: { id: 2, name: "Vocabulary" } as any,
//       options: [
//         { id: 905, option_content: "A food list", is_correct: 1 },
//         { id: 906, option_content: "A bill", is_correct: 0 },
//         { id: 907, option_content: "A dessert", is_correct: 0 },
//         { id: 908, option_content: "A drink", is_correct: 0 },
//       ],
//       case: null,
//     },
//     {
//       id: 140,
//       question_type: 1,
//       question_content: "She said she ___ busy yesterday.",
//       listening_content: null,
//       answer_writing: null,
//       category: { id: 3, name: "A2", order: 3, question_count: 60 },
//       tag: { id: 1, name: "Grammar" } as any,
//       options: [
//         { id: 557, option_content: "is", is_correct: 0 },
//         { id: 558, option_content: "was", is_correct: 1 },
//         { id: 559, option_content: "were", is_correct: 0 },
//         { id: 560, option_content: "has been", is_correct: 0 },
//       ],
//       case: null,
//     },
//     {
//       id: 34,
//       question_type: 3,
//       question_content: "Why is Tom shopping?",
//       listening_content: null,
//       answer_writing: null,
//       category: { id: 3, name: "A2", order: 3, question_count: 60 },
//       tag: { id: 2, name: "Vocabulary" } as any,
//       options: [
//         { id: 133, option_content: "He's buying a tablet", is_correct: 0 },
//         { id: 134, option_content: "He needs a new phone", is_correct: 1 },
//         { id: 135, option_content: "He's working at the store", is_correct: 0 },
//         { id: 136, option_content: "He's fixing his phone", is_correct: 0 },
//       ],
//       case: "Tom is going to the electronics shop. He wants a phone with a good battery and camera. One phone is cheap but basic, another is costly but better quality.",
//     },
//     {
//       id: 244,
//       question_type: 1,
//       question_content: '"Delay" means to:',
//       listening_content: null,
//       answer_writing: null,
//       category: { id: 4, name: "B1", order: 4, question_count: 60 },
//       tag: { id: 2, name: "Vocabulary" } as any,
//       options: [
//         { id: 973, option_content: "speed up", is_correct: 0 },
//         { id: 974, option_content: "cancel", is_correct: 0 },
//         { id: 975, option_content: "make something late", is_correct: 1 },
//         { id: 976, option_content: "begin earlier", is_correct: 0 },
//       ],
//       case: null,
//     },
//     {
//       id: 160,
//       question_type: 1,
//       question_content: "She admitted to ___ late.",
//       listening_content: null,
//       answer_writing: null,
//       category: { id: 4, name: "B1", order: 4, question_count: 60 },
//       tag: { id: 1, name: "Grammar" } as any,
//       options: [
//         { id: 637, option_content: "arrive", is_correct: 0 },
//         { id: 638, option_content: "arriving", is_correct: 1 },
//         { id: 639, option_content: "be arriving", is_correct: 0 },
//         { id: 640, option_content: "arrived", is_correct: 0 },
//       ],
//       case: null,
//     },
//   ],
// };

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildSubmitPayload(
  questions: Question[],
  answers: Record<number, number>,
) {
  const byCategory: Record<
    number,
    {
      category_id: number;
      category_name: string;
      total_questions: number;
      checked_option: number[];
    }
  > = {};

  questions.forEach((q) => {
    const cid = q.category.id;
    if (!byCategory[cid]) {
      byCategory[cid] = {
        category_id: cid,
        category_name: q.category.name,
        total_questions: 0,
        checked_option: [],
      };
    }
    byCategory[cid].total_questions += 1;
    if (answers[q.id] !== undefined) {
      byCategory[cid].checked_option.push(answers[q.id]);
    }
  });

  return Object.values(byCategory);
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = (current / total) * 100;
  return (
    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-[#0f3460] transition-all duration-500 rounded-full"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function OptionRow({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-all duration-200 text-sm font-medium
        ${
          selected
            ? "border-[#0f3460] bg-[#0f3460]/5 text-[#0f3460]"
            : "border-gray-200 bg-white text-gray-700 hover:border-[#0f3460]/40 hover:bg-gray-50"
        }`}
    >
      <span
        className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all
          ${selected ? "border-[#0f3460]" : "border-gray-300"}`}
      >
        {selected && (
          <span className="w-2 h-2 rounded-full bg-[#0f3460] block" />
        )}
      </span>
      {label}
    </button>
  );
}

// ─── Exit Alert Modal ─────────────────────────────────────────────────────────

function ExitModal({
  onStay,
  onLeave,
}: {
  onStay: () => void;
  onLeave: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 animate-fadeIn">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
            <svg
              className="w-7 h-7 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-lg font-bold text-gray-900 text-center mb-2">
          Leave the test?
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Your progress will be lost. You cannot resume this test once you
          leave.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onStay}
            className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Stay
          </button>
          <button
            onClick={onLeave}
            className="flex-1 py-2.5 rounded-lg bg-red-500 text-sm font-semibold text-white hover:bg-red-600 transition"
          >
            Leave
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Screens ──────────────────────────────────────────────────────────────────

type Screen = "onboarding" | "rules" | "exam" | "done";

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PlacementTest() {
  const [screen, setScreen] = useState<Screen>("onboarding");
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState<ApiData | null>(null);
  const [whyLearn, setWhyLearn] = useState<string>("");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const questions = apiData?.questions ?? [];
  const totalSeconds = parseInt(apiData?.time_of_exam ?? "60") * 60;
  const [result, setResult] = useState<{
    percentage: number;
    total_questions: number;
    total_correct_answers: number;
    max_level: { name: string };
  } | null>(null);
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pendingNavRef = useRef<(() => void) | null>(null);

  const WHY_OPTIONS = [
    "Work or career",
    "Study or education",
    "Travel",
    "Personal interest",
  ];

  // ── Timer ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (screen !== "exam") return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [screen, timeLeft]);

  // ── Block browser back / tab close / reload ───────────────────────────────
  useEffect(() => {
    if (screen !== "exam") return;

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    const onPopState = () => {
      // Push state back so the user stays
      window.history.pushState(null, "", window.location.href);
      setShowExitModal(true);
      pendingNavRef.current = () => window.history.back();
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("beforeunload", onBeforeUnload);
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      window.removeEventListener("popstate", onPopState);
    };
  }, [screen]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleAnswer = (questionId: number, optionId: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleNext = () => {
    const q = questions[currentIdx];
    if (answers[q.id] === undefined) return; // enforce no-skip
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    const payload = buildSubmitPayload(questions, answers);

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1];

    try {
      const res = await fetch(
        "https://devknowledgeapi.gosorsolutions.com/api/v1/placement-test",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json();
      console.log("Response:", data);
      if (data?.status && data?.data) {
        setResult(data.data);
      }
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setScreen("done");
      setIsSubmitting(false);
    }
  }, [questions, answers]);

  const currentQuestion = questions[currentIdx];
  const isAnswered = answers[currentQuestion?.id] !== undefined;
  const isLast = currentIdx === questions.length - 1;

  const timerWarning = timeLeft <= 120; // last 2 min

  // ── Render ────────────────────────────────────────────────────────────────

  if (screen === "onboarding") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-lg">
          <p className="text-sm text-gray-400 mb-1">Get Ready to Start</p>
          <p className="text-xs text-gray-400 mb-6">
            just enter your details, and you're ready to go
          </p>

          <div className="flex items-center gap-2 mb-6">
            <svg
              className="w-5 h-5 text-[#0f3460]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h1 className="text-base font-bold text-gray-800">
              Why do you want to learn English?
            </h1>
          </div>

          {/* Dropdown-style select */}
          <div className="relative mb-6">
            <select
              value={whyLearn}
              onChange={(e) => setWhyLearn(e.target.value)}
              className="w-full appearance-none border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#0f3460] bg-gray-50 focus:outline-none focus:border-[#0f3460] cursor-pointer"
            >
              <option value="">Select answer</option>
              {WHY_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <svg
              className="w-4 h-4 text-[#0f3460] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* Radio options */}
          <div className="flex flex-col gap-2 mb-8">
            {WHY_OPTIONS.map((o) => (
              <button
                key={o}
                onClick={() => setWhyLearn(o)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-sm text-left transition-all
                  ${whyLearn === o ? "border-[#0f3460] bg-[#0f3460]/5 text-[#0f3460]" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
              >
                <span
                  className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${whyLearn === o ? "border-[#0f3460]" : "border-gray-300"}`}
                >
                  {whyLearn === o && (
                    <span className="w-2 h-2 rounded-full bg-[#0f3460] block" />
                  )}
                </span>
                {o}
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              disabled={!whyLearn}
              onClick={() => setScreen("rules")}
              className="px-8 py-2.5 rounded-lg bg-[#0f3460] text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#0d2d54] transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "rules") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-lg">
          <p className="text-sm font-semibold text-gray-700 mb-4">
            A 30-40 minute test of your core skills
          </p>

          <div className="border border-gray-100 rounded-xl p-4 mb-6 space-y-3">
            {[
              { n: "①", label: "Grammar and vocabulary" },
              { n: "②", label: "Writing" },
              { n: "③", label: "Listening" },
            ].map((s) => (
              <div
                key={s.n}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <span className="text-gray-400">{s.n}</span> {s.label}
              </div>
            ))}
          </div>

          <p className="text-sm font-semibold text-gray-700 mb-3">Test Rules</p>
          <div className="border border-gray-100 rounded-xl p-4 space-y-3 mb-8">
            {[
              { icon: "⏱", text: "Answer questions before time runs out!" },
              { icon: "⏸", text: "You can't pause the test" },
              { icon: "🔇", text: "You must be in a quiet place" },
              { icon: "🙅", text: "You must do the test alone" },
              {
                icon: "📵",
                text: "You can't use books, notes or extra digital devices",
              },
            ].map((r) => (
              <div
                key={r.text}
                className="flex items-start gap-3 text-sm text-gray-600"
              >
                <span>{r.icon}</span>
                <span>{r.text}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              disabled={loading}
              onClick={async () => {
                setLoading(true);
                try {
                  const token = document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("auth_token="))
                    ?.split("=")[1];
                  const res = await fetch(
                    "https://devknowledgeapi.gosorsolutions.com/api/v1/placement-test",
                    {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                      },
                    },
                  );
                  const json = await res.json();
                  if (json?.status && json?.data) {
                    setApiData(json.data);
                    setTimeLeft(parseInt(json.data.time_of_exam) * 60);
                    setScreen("exam");
                  } else {
                    alert("Failed to load questions. Please try again.");
                  }
                } catch (err) {
                  console.error(err);
                  alert("Network error. Please try again.");
                } finally {
                  setLoading(false);
                }
              }}
              className="px-8 py-2.5 rounded-lg bg-[#0f3460] text-white text-sm font-semibold hover:bg-[#0d2d54] transition disabled:opacity-60 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                    />
                  </svg>
                  Loading…
                </>
              ) : (
                "I agree"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "done") {
    const wrong = result
      ? result.total_questions - result.total_correct_answers
      : null;
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-3">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Test Submitted!</h2>
            <p className="text-sm text-gray-400 mt-1">Here are your results</p>
          </div>

          {result ? (
            <>
              {/* Percentage circle */}
              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#f3f4f6"
                      strokeWidth="10"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke={
                        result.percentage >= 60
                          ? "#22c55e"
                          : result.percentage >= 40
                            ? "#f59e0b"
                            : "#ef4444"
                      }
                      strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      strokeDashoffset={`${2 * Math.PI * 50 * (1 - result.percentage / 100)}`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">
                      {result.percentage}%
                    </span>
                    <span className="text-xs text-gray-400">Score</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Total</p>
                  <p className="text-xl font-bold text-gray-800">
                    {result.total_questions}
                  </p>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-green-500 mb-1">Correct</p>
                  <p className="text-xl font-bold text-green-600">
                    {result.total_correct_answers}
                  </p>
                </div>
                <div className="bg-red-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-red-400 mb-1">Wrong</p>
                  <p className="text-xl font-bold text-red-500">{wrong}</p>
                </div>
              </div>

              {/* Level badge */}
              {result.max_level && (
                <div className="flex items-center justify-between bg-[#0f3460]/5 border border-[#0f3460]/10 rounded-xl px-4 py-3 mb-6">
                  <span className="text-sm text-gray-600 font-medium">
                    Your Level
                  </span>
                  <span className="text-sm font-bold text-[#0f3460] bg-[#0f3460]/10 px-3 py-1 rounded-full">
                    {result.max_level.name}
                  </span>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-400 text-center mb-6">
              Your answers have been recorded.
            </p>
          )}

          <button
            onClick={() => window.location.reload()}
            className="w-full py-2.5 rounded-lg bg-[#0f3460] text-white text-sm font-semibold hover:bg-[#0d2d54] transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // ── EXAM screen ───────────────────────────────────────────────────────────
  const sameCase = currentQuestion.case;
  // const sameCaseQuestions = sameCase
  //   ? questions.filter((q) => q.case === sameCase)
  //   : [];

  return (
    <>
      {showExitModal && (
        <ExitModal
          onStay={() => {
            setShowExitModal(false);
            pendingNavRef.current = null;
          }}
          onLeave={() => {
            setShowExitModal(false);
            // Navigate away
            window.removeEventListener("beforeunload", () => {});
            if (pendingNavRef.current) {
              pendingNavRef.current();
            } else {
              window.location.href = "/";
            }
          }}
        />
      )}

      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center gap-4">
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-500 mb-1">
              Part 1 – Grammar and vocabulary
            </p>
            <ProgressBar current={currentIdx + 1} total={questions.length} />
            <p className="text-xs text-gray-400 mt-1">
              {currentIdx + 1}/{questions.length}
            </p>
          </div>
          <div
            className={`text-sm font-mono font-bold tabular-nums transition-colors ${
              timerWarning ? "text-red-500 animate-pulse" : "text-[#0f3460]"
            }`}
          >
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 flex items-start justify-center p-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm w-full max-w-2xl p-6">
            {/* Reading passage */}
            {sameCase && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5 text-sm text-gray-700 leading-relaxed">
                <p className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wide">
                  Reading Passage
                </p>
                {sameCase
                  .replace(/^Short reading passage:\r?\n/, "")
                  .replace(/^Read this short text:\r?\n/, "")}
              </div>
            )}

            {/* Question */}
            <p className="text-sm font-semibold text-gray-800 mb-5 leading-relaxed">
              {currentQuestion.question_content}
            </p>

            {/* Options */}
            <div className="flex flex-col gap-2 mb-6">
              {currentQuestion.options.map((opt) => (
                <OptionRow
                  key={opt.id}
                  label={opt.option_content}
                  selected={answers[currentQuestion.id] === opt.id}
                  onClick={() => handleAnswer(currentQuestion.id, opt.id)}
                />
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNext}
                disabled={!isAnswered || isSubmitting}
                className="px-8 py-2.5 rounded-lg bg-[#0f3460] text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#0d2d54] transition flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                      />
                    </svg>
                    Submitting…
                  </>
                ) : isLast ? (
                  "Submit"
                ) : (
                  "Next"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease; }
      `}</style>
    </>
  );
}
