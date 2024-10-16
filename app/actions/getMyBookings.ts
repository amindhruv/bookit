"use server";

import { createSessionClient } from "@/config/appwrite";
import { Booking } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Query } from "node-appwrite";
import checkAuth from "./checkAuth";

export default async function getMyBookings() {
  const sessionCookie = cookies().get("appwrite-session");
  if (!sessionCookie) {
    redirect("/login");
  }

  try {
    const { databases } = await createSessionClient(sessionCookie.value);

    const { user } = await checkAuth();
    if (!user) {
      return { error: "User must be logged in to view bookings" };
    }

    const { documents: bookings } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS!,
      [Query.equal("user_id", user.id)]
    );

    return { bookings: bookings as unknown as Booking[] };
  } catch (error) {
    console.log("Failed to get user bookings", error);
    return { error: "Failed to get user bookings" };
  }
}
