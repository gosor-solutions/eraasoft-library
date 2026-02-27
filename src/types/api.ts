export interface ApiResponse<T> {
  message: string;
  data: T | null;
  status: boolean;
  code: number;
  meta?: {
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    per_page: number;
    total: number;
  };
}

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}
