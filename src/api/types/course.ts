export interface Course {
  id: number;
  course_content: string;
  currency: string;
  description: string;
  duration: number;
  has_ended: number;
  image:string;
  instructor_name: string
  is_enrolled: boolean;
  learning_plan: string;
  level: string;
  level_id: number;
  placement_test_available: number;
  preview_video: string;
  preview_video_thumbnail: string;
  price: string;
  sessions_count: number;
  status: number;
  title: string;
  topic_id: number;
  what_you_will_learn: string[];
}
