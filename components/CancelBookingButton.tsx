"use client";

import cancelBooking from "@/app/actions/cancelBooking";
import { toast } from "react-toastify";

export default function CancelBookingButton({
  bookingId,
}: {
  bookingId: string;
}) {
  const handleCancel = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirmed) return;
    const { error, success } = await cancelBooking(bookingId);
    if (error) toast.error(error);
    if (success) toast.success("Booking cancelled successfully");
  };

  return (
    <button
      onClick={handleCancel}
      className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700"
    >
      Cancel Booking
    </button>
  );
}
