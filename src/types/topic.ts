import type { Course } from "./course";

export type GetTopicsResponse = Topic[];

export type Topic = { id: number; name: string; order: number };

export type GetTopicCoursesResponse = Course[];

export type GetFreeMaterialsResponse = Subject[];

export type Subject = {
  id: number;
  title: string;
  course: { id: number; title: string };
  free_materials: FreeMaterial[];
};

export type FreeMaterial = {
  id: number;
  type: "video" | "pdf";
  title: string;
  link: string;
};
