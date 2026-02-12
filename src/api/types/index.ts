export interface APIResponse<T> {
  data: T;
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{ url: string; label: string; active: boolean }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
}

