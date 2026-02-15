"use client";

import OTPVerificationEnhanced from "@/components/pages/AuthPages/OTP";
import { isOTPPending } from "@/lib/clientAuth";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  if (!isOTPPending()) {
    router.replace("/register");
  }

  return <OTPVerificationEnhanced />;
}
