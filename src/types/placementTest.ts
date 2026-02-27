import type { Course } from "./course";

export type GetPlacementTestResponse = {
  listening: string;
  reading: string;
  case: string;
  time_of_exam: string;
  questions_count: number;
  questions: Question[];
};

export type Question = {
  id: number;
  text: string;
  question_type: "listening" | "reading" | "case";
  category: { id: number; name: string };
  tag: { id: number; name: string } | null;
  options: { id: number; text: string }[];
};

export type PostPlacementTestBody = Array<{
  category_id: number;
  category_name: string;
  total_questions: number;
  checked_option: number[];
}>;

export type PostPlacementTestResponse = {
  percentage: number;
  total_questions: number;
  total_correct_answers: number;
  max_level: {
    id: number;
    level: string;
    correct_answer_count: number;
    total_questions: number;
  } | null;
  avaleble_courses: Course[];
  levels: Array<{
    level_id: number;
    level: string;
    category_order: number;
    correct_answer_count: number;
    total_questions: number;
  }>;
};

export type GetPlacementTestResultsResponse = PlacementTestResult[];

export type PlacementTestResult = {
  id: number;
  user_id: number;
  total_correct_answers: number;
  total_questions: number;
  percentage: number;
  max_level_id: number;
  levels: object;
  created_at: string;
};
