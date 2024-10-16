import Heading from "@/components/Heading";
import getMyBookings from "../actions/getMyBookings";
import BookedRoomCard from "@/components/BookedRoomCard";

export default async function BookingsPage() {
  const { bookings, error } = await getMyBookings();

  return (
    <>
      <Heading title="Bookings" />
      {error && <p>{error}</p>}
      {bookings?.length ? (
        bookings.map((booking) => (
          <BookedRoomCard key={booking.room_id.$id} booking={booking} />
        ))
      ) : (
        <p>No bookings found</p>
      )}
    </>
  );
}
