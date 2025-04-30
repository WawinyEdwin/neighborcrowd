import LoginClient from "@/app/components/LoginClient";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <LoginClient />
    </Suspense>
  );
}
