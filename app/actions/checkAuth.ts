"use server";

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";

export default async function checkAuth() {
  const sessionCookie = cookies().get("appwrite-session");
  if (!sessionCookie) {
    return { isAuthenticated: false };
  }
  try {
    const { account } = await createSessionClient(sessionCookie.value);
    const { $id, email, name } = await account.get();
    return {
      isAuthenticated: true,
      user: { id: $id, email, name },
    };
  } catch (error) {
    console.log("Error while checking auth", error);
    return { isAuthenticated: false };
  }
}
