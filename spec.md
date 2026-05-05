``` ts
export interface CreateContactUsRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export type Course = {
  id: number;
  title?: string;
  price?: number;
  status?: number;
  type?: (typeof CourseType)[keyof typeof CourseType];
  description?: string;
  duration?: number;
  currency?: string;
  level?: string;
  image?: string;
  placement_test_available?: boolean;
  category?: { id: number; name: string };
  topic?: Topic;
  lectures?: Lecture[];
  rounds?: Round[];
  sessions_count?: number;
  what_you_will_learn?: string[];
  preview_video?: string;
  preview_video_thumbnail?: string;
};

export type Round = {
  id: number;
  name?: string;
  price?: string;
  discount?: string;
  task_submissions_is_corrected?: string;
  absence?: { absence_rate?: number; absence_count?: number };
  end_date?: string;
  has_ended?: boolean;
  has_not_started?: boolean;
  is_running?: boolean;
  start_date?: string;
  status?: number;
  task_submission_rate?: number;
  type?: (typeof CourseType)[keyof typeof CourseType];

  whatsapp_group_link?: string;
  google_meet_link?: string;
  max_students?: number;
  max_student?: number;
  link_url?: string;
  attendance_rate?: number;
  average_rating?: null;
  course?: Course;

  lectures?: Lecture[];

  // additional_instructors?: string[];

  // round_content?: string;
  // notices?: Notice[];
  // branch?: Branch;
  // instructor?: User;
  // course?: Course;
  // lectures_count?: number;
  // weeks_count?: number;
  // lectures?: Lecture[];
  // quiz?: Quiz[];
  // installments?: Installment[];
  // transactions?: Transaction[];
};

export interface HeroSlide {
  id: number;
  image_path: string;
  is_active: boolean | null;
  title: string | null;
  description: string | null;
  order: number | null;
  cta_text_1: string | null;
  cta_link_1: string | null;
  cta_text_2: string | null;
  cta_link_2: string | null;
  created_at: string | null;
}

export type Lecture = {
  id: number;
  name?: string;
  url?: string;
  round_id?: number;
  start_time?: string;
  week_number?: number;
  status?: number;
  files: {
    id: number;
    name?: string;
    path?: string;
  }[];
  lecture_videos: {
    id: number;
    url: string;
    title: string;
  }[];
};

export interface AppSettings {
  logo?: string;
  facebook?: string;
  x?: string;
  linkedin?: string;
  phone_1?: string;
  phone_2?: string;
  whatsapp_num_1?: string;
  whatsapp_num_2?: string;
  about?: string;
  help_center?: string;
  terms_and_conditions?: string;
  about_ar?: string;
  help_center_ar?: string;
  terms_and_conditions_ar?: string;
  telegram?: string;
  youtube?: string;
  instagram?: string;
  listening?: string;
  reading?: string;
  case?: string;
  time_of_exam?: string;
  refund_policy?: string;
  refund_policy_ar?: string;
  privacy_policy?: string;
  privacy_policy_ar?: string;
  primary_color?: string;
  secondary_color?: string;
  third_color?: string;
  logo_student?: string;
  logo_instructor?: string;
  message?: string;
  student_video?: string;
  [key: string]: string | undefined;
}

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


```