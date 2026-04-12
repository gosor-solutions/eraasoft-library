import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import DOMPurify from "dompurify"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function stripHtml(html: string, maxLength: number = 150): string {
  const text = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] }).replace(/&nbsp;/g, " ").trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}
