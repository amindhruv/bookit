import getMyRooms from "@/app/actions/getMyRooms";
import Heading from "@/components/Heading";
import MyRoomCard from "@/components/MyRoomCard";

export default async function MyRoomsPage() {
  const rooms = await getMyRooms();
  return (
    <>
      <Heading title="My rooms" />
      {rooms.length > 0 ? (
        rooms.map((room) => <MyRoomCard key={room.$id} room={room} />)
      ) : (
        <p>You have no room listings</p>
      )}
    </>
  );
}
