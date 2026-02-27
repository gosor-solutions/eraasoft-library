export type RefreshTokenBody = { device_token: string };
export type RefreshTokenResponse = { device_token: boolean };

export type GoogleLoginBody = {
  client_id: string;
  email: string;
  name: string;
  type: "google" | "apple";
  device_token: string;
};

export type GoogleLoginResponse = {
  status: "success";
  token: string;
  user: User;
  is_phone_exists: boolean;
};

export type User = {
  id: number;
  name: string;
  email: string;
  [key: string]: unknown;
};

export interface UserResource {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  image: string | null;
  created_at: string;
  status: number;
  country: string | null;
  gov: string | null;
  college: string | null;
  gender: string | null;
  desc_instructor: string | null;
  role_id: number | null;
  google_id: string | null;
  apple_id: string | null;
  attendance_rate: number | null;
  task_submission_rate: number | null;
  average_rating: number | null;
  birthdate: string | null;
  placement_test_status: boolean;

  role?: {
    role_name: string;
    permissions: { id: number }[];
  };
  enrolled_courses?: unknown[];
  student_rounds?: { id: number; name: string; status: number }[];
  transactions?: unknown[];
  installments?: unknown[];
  my_evaluation?: unknown;
  task_submissions?: unknown;
  attendance_evaluation?: { attended: number; text: number };
  task_evaluation_average?: number | null;
  enrolled_rounds?: {
    id: number;
    name: string;
    status: number;
    lectures: unknown[];
  }[];
}

export interface AuthWithPhoneAndNameRequest {
  phone: string;
  name: string;
}

export interface AuthWithPhoneRequest {
  phone: string;
}

export interface VerifyOtpRequest {
  phone: string;
  otp: string;
  device_token: string;
}
