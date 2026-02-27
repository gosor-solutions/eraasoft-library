import type { Topic } from "./topic";

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
