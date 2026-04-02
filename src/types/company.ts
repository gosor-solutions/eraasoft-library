export interface CompanyImage {
  id: number;
  name?: string;
  image_path: string;
  is_active: boolean;
  order: number;
}

export interface CompanyReview {
  id: number;
  reviewer_name: string;
  content: string;
  rating: number;
  is_active: boolean;
  order: number;
}
