"use server";

import { createSessionClient } from "@/config/appwrite";
import { Rooms } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Query } from "node-appwrite";

export default async function getMyRooms() {
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

    return rooms as unknown as Rooms;
  } catch (error) {
    console.log("Failed to get user rooms", error);
    redirect("/error");
  }
}
