import type { ApiResponse } from "./api";
import type { Lecture } from "./learning";
import type { Topic } from "./topic";

export const CourseType = {
  ONLINE: 0,
  KIDS: 1,
  OFFLINE: 2,
} as const;

export const CourseTypeLabels = {
  [CourseType.ONLINE]: "Online Courses",
  [CourseType.KIDS]: "Kids Courses",
  [CourseType.OFFLINE]: "Offline Courses",
} as const;

export type GetCoursesResponse = ApiResponse<Course[]>;

export type GetCourseResponse = ApiResponse<Course>;

export type GetUserSessionsResponse = Round[];

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
