import type { Course } from "./course";

export interface UserResource {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  image: string | null;
  created_at: string | null;
  status: unknown;
  country: unknown;
  gov: unknown;
  college: unknown;
  gender: unknown;
  desc_instructor: unknown;
  role_id: number | null;
  google_id: string | null;
  apple_id: string | null;
  attendance_rate: number | null;
  task_submission_rate: number | null;
  average_rating: number | null;
  role?: {
    role_name: string;
    permissions: { id: number }[];
  };
  birthdate: string | null;
  placement_test_status: unknown;
  enrolled_courses?: Course[];
  student_rounds?: { id: number; name: string; status: unknown }[];
  transactions?: unknown[];
  installments?: unknown[];
  my_evaluation?: unknown;
  task_submissions?: unknown | null;
  attendance_evaluation?: { attended: number; text: number };
  task_evaluation_average?: number | null;
  enrolled_rounds?: {
    id: number;
    name: string;
    status: unknown;
    lectures: unknown[];
  }[];
}

export interface UpdateUserRequest {
  name: string;
  phone: string;
  email: string;
  password?: string | null; // min:8
}

export interface UpdateUserPhoneRequest {
  phone: string;
}
