import { Button } from "@/components/shared/button";
import { Checkbox } from "@/components/shared/checkbox";
import { Input } from "@/components/shared/input";
import {
  useCheckCoupon,
  useEnrollCourse,
} from "@/hooks/mutations/useCourseEnrollmentMutations";
import type { Course } from "@/types/course";
import type { CheckCouponResponse } from "@/types/courseEnrollment";
import { Calendar, DollarSign, TrendingUp, Video } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router";
import { toast } from "sonner";

export function CheckoutOrderSummary() {
  const course = useLocation().state?.course as Course;
  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState<CheckCouponResponse | null>(null);
  const [terms, setTerms] = useState(false);

  const checkCouponMutation = useCheckCoupon();
  const enrollMutation = useEnrollCourse();

  const discount = coupon?.discount_percentage
    ? (course?.price * coupon.discount_percentage) / 100
    : 0;

  const total = course?.price - discount;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg">
        {/* Course Card */}
        <div className="flex gap-4">
          {/* Course Image */}
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg">
            <img
              src={course?.image}
              alt="Course"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Course Title */}
          <div className="flex-1">
            <h3 className="text-base font-semibold leading-tight">
              {course?.title}
            </h3>
          </div>
        </div>

        {/* Course Details Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Level */}
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-gray-600" />
            <span className="text-gray-700">Level: {course?.level}</span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-600" />
            <span className="text-gray-700">{course?.duration} weeks</span>
          </div>

          {/* Sessions */}
          <div className="flex items-center gap-2 text-sm">
            <Video className="h-4 w-4 text-gray-600" />
            <span className="text-gray-700">
              sessions: {course?.sessions_count}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-gray-600" />
            <span className="text-gray-700">
              {course?.price} {course?.currency}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Order Summary */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold">Order Summary</h3>

          {/* Course Fee */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Course fee</span>
            <span className="font-medium">
              {course?.price} {course?.currency}
            </span>
          </div>

          {/* Discount */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-red-500">Discount</span>
            <span className="font-medium text-red-500">
              - {discount} {course?.currency}
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-lg font-bold">
              {total} {course?.currency}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Promo Code */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold">Promo Code</h3>
          <div className="flex gap-2">
            <Input
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Add promo code"
              className="flex-1 py-5"
            />
            <Button
              onClick={() =>
                checkCouponMutation.mutate(
                  { coupon_code: couponCode },
                  {
                    onSuccess: (data) => {
                      toast.success("coupon code applied successfully.");
                      setCoupon(data.data);
                    },
                    onError: () => {
                      toast.error("invalid coupon code.");
                    },
                  },
                )
              }
              className="bg-black px-6 py-5 hover:bg-gray-800"
            >
              Apply
            </Button>
          </div>
        </div>

        <div>
          <Checkbox
            id="terms"
            checked={terms}
            onCheckedChange={() => setTerms(!terms)}
          />
          <label htmlFor="terms" className="ms-3">
            I agree to terms and conditions
          </label>
        </div>

        {/* Pay Button */}
        <Button
          onClick={() =>
            enrollMutation.mutate(
              {
                course_id: course?.id,
                terms_and_conditions: terms,
                coupon_code: coupon?.code,
              },
              {
                onSuccess: (data) => {
                  window.open(data.data.redirect_url, "_blank");
                },
              },
            )
          }
          disabled={!terms || enrollMutation.isPending}
          isLoading={enrollMutation.isPending}
          className="w-full bg-[#0A4275] py-6 text-base font-semibold hover:bg-[#083658]"
        >
          Pay {total} {course?.currency}
        </Button>
      </div>
    </div>
  );
}
