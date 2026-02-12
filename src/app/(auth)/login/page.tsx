"use client";

import Login from "@/components/pages/AuthPages/Login";
import { clearOTPPending } from "@/lib/clientAuth";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    clearOTPPending();
  }, []);

  return <Login />;
}
