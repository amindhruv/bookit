"use server";

import { createAdminClient } from "@/config/appwrite";
import { FormState } from "@/types";
import { cookies } from "next/headers";

export default async function createSession(
  previousState: FormState,
  formData: FormData
) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return {
      error: "Please fill out all fields",
    };
  }

  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(
      email.toString(),
      password.toString()
    );
    cookies().set("appwrite-session", session.secret, {
      expires: new Date(session.expire),
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      path: "/",
    });
    return { success: true };
  } catch (error) {
    console.log("Authentication Error:", error);
    return { error: "Invalid credentials" };
  }

  return previousState;
}
