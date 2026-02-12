"use client";

import Register from "@/components/pages/AuthPages/Register";
import { clearOTPPending } from "@/lib/clientAuth";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    clearOTPPending();
  }, []);

  return <Register />;
}
