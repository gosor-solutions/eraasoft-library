export interface Setting {
  id?: number;
  key: string;
  value: string;
  category: string;
  type: string;
}

export interface AppSettings {
  logo?: string;
  facebook?: string;
  x?: string;
  linkedin?: string;
  phone_1?: string;
  phone_2?: string;
  whatsapp_num_1?: string;
  whatsapp_num_2?: string;
  about?: string;
  help_center?: string;
  terms_and_conditions?: string;
  about_ar?: string;
  help_center_ar?: string;
  terms_and_conditions_ar?: string;
  telegram?: string;
  youtube?: string;
  instagram?: string;
  listening?: string;
  reading?: string;
  case?: string;
  time_of_exam?: string;
  refund_policy?: string;
  refund_policy_ar?: string;
  privacy_policy?: string;
  privacy_policy_ar?: string;
  primary_color?: string;
  secondary_color?: string;
  third_color?: string;
  logo_student?: string;
  logo_instructor?: string;
  message?: string;
  [key: string]: string | undefined;
}
