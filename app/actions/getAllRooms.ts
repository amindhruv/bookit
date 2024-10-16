"use server";

import { createAdminClient } from "@/config/appwrite";
import { Rooms } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function getAllRooms() {
  try {
    const { databases } = await createAdminClient();
    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS!
    );

    revalidatePath("/", "layout");

    return rooms as unknown as Rooms;
  } catch (error) {
    console.log("Failed to get rooms", error);
    redirect("/error");
  }
}
