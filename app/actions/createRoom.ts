"use server";

import { createAdminClient } from "@/config/appwrite";
import { FormState } from "@/types";
import { revalidatePath } from "next/cache";
import { ID } from "node-appwrite";
import checkAuth from "./checkAuth";

export default async function createRoom(
  previousState: FormState,
  formData: FormData
) {
  const { databases, storage } = await createAdminClient();
  try {
    const { user } = await checkAuth();

    if (!user) {
      return { error: "You must be logged in to create a room" };
    }

    let imageId;
    const image = formData.get("image") as File;
    if (image && image.size > 0 && image.name !== "undefined") {
      try {
        const response = await storage.createFile(
          process.env.NEXT_PUBLIC_APPWRITE_ROOMS_STORAGE_BUCKET!,
          ID.unique(),
          image
        );
        imageId = response.$id;
      } catch (error) {
        console.log(error);
        return { error: "Error uploading image" };
      }
    } else {
      console.log("No image file provided or file is invalid");
    }

    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS!,
      ID.unique(),
      {
        user_id: user?.id,
        name: formData.get("name")?.toString(),
        description: formData.get("description")?.toString(),
        sqft: Number(formData.get("sqft")?.toString()),
        capacity: Number(formData.get("capacity")?.toString()),
        price_per_hour: Number(formData.get("price_per_hour")?.toString()),
        address: formData.get("address")?.toString(),
        location: formData.get("location")?.toString(),
        availability: formData.get("availability")?.toString(),
        amenities: formData.get("amenities")?.toString(),
        image: imageId,
      }
    );

    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.log(error);

    return { error: "An unexpected error has occured" };
  }

  return previousState;
}
