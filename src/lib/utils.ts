import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const courseImages = ["/adult-course.jpg", "/kids-course.jpg"];

export function getRandomCourseImage() {
  const randomIndex = Math.floor(Math.random() * courseImages.length);
  return courseImages[randomIndex];
}
