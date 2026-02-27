import type { ApiResponse } from "./api";
import type { Lecture } from "./learning";
import type { Topic } from "./topic";

export type GetCoursesResponse = ApiResponse<Course[]>;

export type GetCourseResponse = ApiResponse<Course>;

export type GetUserSessionsResponse = Round[];

export type Course = {
  id: number;
  title?: string;
  price?: number;
  status?: number;
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
  course_id: number;
  start_date: string;
  end_date: string;
  status: number;
};
