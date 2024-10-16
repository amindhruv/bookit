"use server";

import { createAdminClient } from "@/config/appwrite";
import { FormState } from "@/types";
import { ID } from "node-appwrite";

export default async function createUser(
  previousState: FormState,
  formData: FormData
) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");

  if (!name || !email || !password || !confirmPassword) {
    return {
      error: "Please fill out all fields",
    };
  }

  if (password.toString().length < 8) {
    return { error: "Password must be at least 8 characters long" };
  }

  if (password.toString() !== confirmPassword.toString()) {
    return { error: "Passwords do not match" };
  }

  try {
    const { account } = await createAdminClient();
    await account.create(
      ID.unique(),
      email.toString(),
      password.toString(),
      name.toString()
    );
    return { success: true };
  } catch (error) {
    console.log("Registration Error:", error);
    return { error: "Could not create a user" };
  }

  return previousState;
}
