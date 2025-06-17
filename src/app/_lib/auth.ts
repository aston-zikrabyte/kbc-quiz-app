"use server";

import { cookies } from "next/headers";

async function getSession() {
  const cookieStore = await cookies(); // ⏳ Await the Promise

  const access_token = cookieStore.get("access_token")?.value;
  const refresh_token = cookieStore.get("refresh_token")?.value;

  if (!access_token) return null;

  return {
    access_token,
    refresh_token,
  };
}

export { getSession };
