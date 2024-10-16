"use server";

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";

export default async function deleteSession() {
  const session = cookies().get("appwrite-session");
  if (!session) {
    return { error: "No session cookie found" };
  }
  try {
    const { account } = await createSessionClient(session.value);
    await account.deleteSession("current");
    cookies().delete("appwrite-session");
    return { success: true };
  } catch (error) {
    console.log("Sign out error:", error);
    return { error: "Error deleting session" };
  }
}
