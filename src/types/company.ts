export interface GalleryCategory {
  id: number;
  name: string;
}

export interface CompanyImage {
  id: number;
  name?: string;
  image_path: string;
  is_active: boolean;
  order: number;
  company_image_category_id: number;
  category: string;
  created_at: string;
}

export interface CompanyReview {
  id: number;
  reviewer_name: string;
  content: string;
  rating: number;
  is_active: boolean;
  order: number;
}

export interface PartnerCompanyImage {
  id: number;
  name: string;
  image_path: string;
  is_active: boolean;
  order: number;
  created_at: string;
}

export interface Credit {
  id: number;
  name?: string;
  image_path: string;
  is_active: boolean;
  order: number;
}
