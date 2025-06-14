"use server";

import { cookies } from "next/headers";

async function getSession() {
  const cookieStore = await cookies(); // ⏳ Await the Promise

  const access_token = cookieStore.get("access_token")?.value;
  const refresh_token = cookieStore.get("refresh_token")?.value;
  const user_name = cookieStore.get("user_name")?.value;

  if (!access_token) return null;

  return {
    access_token,
    refresh_token,
    user_name,
  };
}

async function getPhoneNumber() {
  const cookieStore = await cookies(); // ⏳ Await the Promise
  const phoneNumber = cookieStore.get("phone_number")?.value;

  if (!phoneNumber) return null;

  return phoneNumber;
}

export { getSession, getPhoneNumber };
