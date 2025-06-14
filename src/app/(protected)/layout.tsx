"use client";

import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export const dynamic = "force-dynamic"; // Ensures SSR every time — needed for cookies

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  // const session = await getSession();
  useEffect(() => {
    async function CheckSession() {
      const session = await getSession();
      if (!session) {
        redirect("/login"); // Securely redirect unauthenticated users
      }
    }
    CheckSession();
  }, []);

  return <>{children}</>;
};

export default ProtectedLayout;
