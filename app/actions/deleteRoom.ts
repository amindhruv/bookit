"use server";

import { createSessionClient } from "@/config/appwrite";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Query } from "node-appwrite";

export default async function deleteRoom(roomId: string) {
  const sessionCookie = cookies().get("appwrite-session");
  if (!sessionCookie) {
    redirect("/login");
  }

  try {
    const { account, databases } = await createSessionClient(
      sessionCookie.value
    );
    const { $id } = await account.get();
    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS!,
      [Query.equal("user_id", $id)]
    );
    const roomToDelete = rooms.find((room) => room.$id === roomId);
    if (roomToDelete) {
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS!,
        roomId
      );
      revalidatePath("/rooms/me", "layout");
      revalidatePath("/", "layout");
      return { success: true };
    }
    return { error: "No room found" };
  } catch (error) {
    console.log("Failed to delete room", error);
    return { error: "Failed to delete room" };
  }
}
