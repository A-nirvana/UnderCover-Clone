"use client";

import { useEffect } from "react";
import { useUser } from "../../userProvider";
import { useRouter } from "next/navigation";

export default function Page() {
  const curUser = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!curUser) {
      router.push("/");
    }
  }, []);
  return <div>Game Zone Protected Route</div>;
}
