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

export interface PaginatedMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
}

export interface PaginatedLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface Paginated<T> {
  data: T[];
  meta: PaginatedMeta;
  links: PaginatedLinks;
}
