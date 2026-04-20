export const QUERY_KEYS = {
  courses: {
    all: () => ["courses"] as const,
    list: (params?: Record<string, unknown>) =>
      [...QUERY_KEYS.courses.all(), params] as const,
    detail: (id: number) => [...QUERY_KEYS.courses.all(), id] as const,
    userSessions: (id: number) =>
      [...QUERY_KEYS.courses.detail(id), "user-sessions"] as const,
  },
  home: {
    all: () => ["home"] as const,
  },
  heroSlides: {
    all: () => ["hero-slides"] as const,
  },
  learning: {
    all: () => ["learning"] as const,
    enrolledRound: (id: number) =>
      [...QUERY_KEYS.learning.all(), "enrolled-rounds", id] as const,
    enrolledCourse: (id: number) =>
      [...QUERY_KEYS.learning.all(), "enrolled-courses", id] as const,
  },
  placementTest: {
    base: () => ["placement-test"] as const,
    results: () => ["placement-test-results"] as const,
  },
  quizzes: {
    all: () => ["quizzes"] as const,
    list: (params?: Record<string, unknown>) =>
      [...QUERY_KEYS.quizzes.all(), params] as const,
    lecture: (id: number) =>
      [...QUERY_KEYS.quizzes.all(), "lecture", id] as const,
    detail: (id: number) => [...QUERY_KEYS.quizzes.all(), id] as const,
    results: (id?: number, params?: Record<string, unknown>) =>
      ["quiz-results", id, params] as const,
  },
  topics: {
    all: (type?: string) => type ? ["topics", type] : ["topics"] as const,
    courses: (id: number) =>
      [...QUERY_KEYS.topics.all(), id, "courses"] as const,
  },
  freeMaterials: {
    all: () => ["free-materials"] as const,
  },
  userProfile: {
    all: () => ["user-profile"] as const,
  },
  settings: {
    all: () => ["settings"] as const,
  },
  aboutUs: {
    images: () => ["company-images"] as const,
    reviews: () => ["company-reviews"] as const,
    partnerImages: () => ["partner-company-images"] as const,
    credits: () => ["credits"] as const,
  },
  blogs: {
    all: () => ["blogs"] as const,
    list: (page?: number) => [...QUERY_KEYS.blogs.all(), "per page", page] as const,
    detail: (id: number) => [...QUERY_KEYS.blogs.all(),"by id", id] as const,
  },
} as const;
