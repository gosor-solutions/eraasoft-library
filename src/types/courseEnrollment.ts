export type EnrollBody = {
  course_id: number;
  terms_and_conditions: boolean;
  coupon_code?: string;
  // payment_method: "visa" | "wallet" | "apple_pay";
};

export type EnrollResponse = {
  amount: string;
  redirect_url: string;
};

export type CheckCouponBody = { coupon_code: string };

export type CheckCouponResponse = {
  code: string;
  type: string;
  discount_percentage: number;
};
