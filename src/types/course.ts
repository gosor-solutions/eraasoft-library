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

/*
            'coupon_amount' => $this->whenLoaded('myCourseEnrollment', function () {
                return $this->myCourseEnrollment->coupon_amount;
            }),
            'whatsapp_group_link' => $this->whatsapp_group_link,
            'google_meet_link' => $this->google_meet_link,
            'max_students' => $this->max_students,
            'status' => $this->status,
            'type' => $this->type,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'max_student' => $this->max_student,
            'link_url' => $this->link_url,
            'attendance_rate' => auth()->user()->type == UserType::INSTRUCTOR->value
                ? $this->getAttendanceRate()
                : $this->getAttendanceRateByUser(),

            'task_submission_rate' => auth()->user()->type == UserType::INSTRUCTOR->value
                ? $this->getTaskSubmissionRate()
                : $this->getTaskSubmissionRateByUser(),
            'average_rating' => null,
            'additional_instructors' => $this->additional_instructors,
            'round_content' => $this->round_content,
            'notices' => NoticeResource::collection($this->whenLoaded('notices')),
            'branch' => $this->whenLoaded('branch', function () {
                return new BrancheResource($this->branch);
            }),
            'is_running' => $this->isRunning(),
            'has_ended' => $this->hasEnded(),
            'has_not_started' => $this->hasNotStarted(),
            'student_ids' => $this->whenLoaded('students', function () {
                return $this->students->pluck('id');
            }, []),
            'instructor' => new UserResource($this->whenLoaded('instructor')),
            'course' => new CourseResource($this->whenLoaded('course')),
            'lectures_count' => $this->whenLoaded('lectures', fn() => $this->lectures->count()),
            'weeks_count' => $this->whenLoaded('lectures', fn() => $this->lectures->groupBy('week_number')->count()),
            'lectures' => $this->whenLoaded('lectures', function () {
                if ($this->lectures->isEmpty()) {
                    return null;
                }
                return LectureResource::collection($this->lectures->load('attachments'));
            }),
            'quiz' => $this->whenLoaded('quiz', fn() => QuizResource::collection($this->quiz)),
            'installments' => $this->whenLoaded('installments', function () {
                $this->installments->count();
            }),
            'transactions' => $this->whenLoaded('transactions', function () {
                $this->transactions->count();
            })

*/
