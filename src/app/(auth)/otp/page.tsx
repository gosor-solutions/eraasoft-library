"use client";

import OTPVerificationEnhanced from "@/components/pages/AuthPages/OTP";
import { isOTPPending } from "@/lib/clientAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(true);

  useEffect(() => {
    if (!isOTPPending()) {
      router.replace("/register");
    } else {
      setIsAllowed(true);
    }
  }, [router]);

  if (!isAllowed) return null;

  return <OTPVerificationEnhanced />;
}
