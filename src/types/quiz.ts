export type GetQuizzesResponse = Quiz[];

export type GetQuizResponse = Quiz;

export type Quiz = {
  id: number;
  title: string;
  lecture_id: number;
  lecture: { id: number; title: string };
  questions: QuizQuestion[];
  submissions: QuizSubmission[];
};

export type QuizQuestion = {
  id: number;
  question: string;
  options: { id: number; text: string; is_correct: boolean }[];
};

export type SubmitQuizBody = {
  answers: Array<{
    question_id: number;
    option_id: number;
  }>;
};

export type SubmitQuizResponse = QuizSubmission;

export type GetQuizResultsResponse = QuizSubmission[];

export type QuizSubmission = {
  id: number;
  user_id: number;
  quiz_id: number;
  score: number;
  total_questions: number;
  correct_answers_count: number;
  answers: Array<{
    question_id: number;
    option_id: number;
    is_correct: boolean;
  }>;
  quiz?: Quiz;
};
