import type { Course, Round } from "./course";

export type GetLearningResponse = {
  groups: Round[];
};

export type GetEnrolledRoundResponse = Round;

export type GetEnrolledCourseResponse = Course;

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
  quizzes: {
    id: number;
    name: string;
    submitted: boolean;
  }[];
};