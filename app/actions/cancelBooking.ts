"use server";

import { createSessionClient } from "@/config/appwrite";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import checkAuth from "./checkAuth";

export default async function cancelBooking(bookingId: string) {
  const sessionCookie = cookies().get("appwrite-session");
  if (!sessionCookie) {
    redirect("/login");
  }

  try {
    const { databases } = await createSessionClient(sessionCookie.value);

    const { user } = await checkAuth();
    if (!user) {
      return { error: "User must be logged in to cancel booking" };
    }

    const booking = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS!,
      bookingId
    );

    if (booking.user_id !== user.id) {
      return {
        error: "You are not authorized to cancel this booking",
      };
    }

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS!,
      bookingId
    );

    revalidatePath("/bookings", "layout");

    return { success: true };
  } catch (error) {
    console.log("Failed to cancel booking", error);
    return { error: "Failed to cancel booking" };
  }
}
