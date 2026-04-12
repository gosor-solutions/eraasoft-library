import type { Topic } from "./topic";

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

export type GetHeroSlidesResponse = {
  data: HeroSlide[];
};

export type GetHomeResponse = {
  placement_test_status: 0 | 1;
  topics: Topic[];
  lecturerLogs: Array<{
    course_id: number;
    count: number;
    Lecture_count: number;
    percentage: number;
    last_log: LecturerLog;
    logs: LecturerLog[];
  }>;
};

export type LecturerLog = {
  id: number;
  course_id: number;
  user_id: number;
  created_at: string;
};
