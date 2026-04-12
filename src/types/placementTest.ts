import type { Course } from "./course";

export interface CategoryResource {
  id: number;
  name: string;
  order: number;
  questions?: QuestionResource[];
  question_count?: number;
}

export interface BankOptionResource {
  id: number;
  option_content: string;
  is_correct: boolean | number;
}

export interface QuestionResource {
  id: number;
  question_type: number;
  question_content: string;
  listening_content: string | null;
  answer_writing: string | null;
  category: CategoryResource;
  tag?: unknown; // Inferred relation
  options?: BankOptionResource[];
  case: unknown; // Inferred relation
}

export interface PlacementTestSettingsResponse {
  listening: string;
  reading: string;
  case: string;
  time_of_exam: string;
  questions_count: number;
  questions: QuestionResource[];
}

export interface CheckAnswersRequestCategory {
  category_id: number;
  category_name: string;
  total_questions: number;
  checked_option: number[];
}

export type CheckAnswersRequest = CheckAnswersRequestCategory[];

export interface LevelResultItem {
  level_id: number;
  level: string;
  category_order: number;
  correct_answer_count: number;
  total_questions: number;
}

export interface LevelResults {
  percentage: number;
  total_questions: number;
  total_correct_answers: number;
  max_level: LevelResultItem;
  avaleble_courses: Course[];
  levels: LevelResultItem[];
}

export interface PlacementTestResultResource {
  id: number;
  user?: unknown; // Could be UserResource but simplified here
  total_questions: number;
  total_correct_answers: number;
  max_level?: CategoryResource; 
  percentage: number;
  levels: unknown[];
}

