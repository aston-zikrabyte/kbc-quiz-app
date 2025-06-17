"use client";

import { getSession } from "@/app/_lib/auth";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const PrivateWhenLoggedIn = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    async function CheckSession() {
      const session = await getSession();
      if (session) {
        redirect("/home");
      }
    }
    CheckSession();
  }, []);
  return <>{children}</>;
};

export default PrivateWhenLoggedIn;
