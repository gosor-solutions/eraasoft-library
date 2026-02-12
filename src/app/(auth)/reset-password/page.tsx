import CreateNewPassword from "@/components/pages/AuthPages/CreateNewPassword";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateNewPassword />
    </Suspense>
  );
}
