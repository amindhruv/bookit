"use client";

import deleteRoom from "@/app/actions/deleteRoom";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function DeleteRoomButton({ roomId }: { roomId: string }) {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete the room?"
    );
    if (!confirmed) return;
    const { error, success } = await deleteRoom(roomId);
    if (error) toast.error(error);
    if (success) toast.success("Room deleted successfully");
  };

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-red-700"
      onClick={handleDelete}
    >
      <FaTrash className="inline mr-1" /> Delete
    </button>
  );
}
