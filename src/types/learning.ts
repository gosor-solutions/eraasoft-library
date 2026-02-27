import type { Course, Round } from "./course";

export type GetLearningResponse = {
  groups: Round[];
};

export type GetEnrolledRoundResponse = Round;

export type GetEnrolledCourseResponse = Course;

export type Lecture = {
  id: number;
  title: string;
  [key: string]: unknown;
};
