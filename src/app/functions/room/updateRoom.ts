// app/functions/room/updateRoom.ts
import { RoomDetail } from "@/types/Room";

export async function updateRoom(
  id: number,
  room: RoomDetail
): Promise<boolean> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      id_rooms_type: room.id_rooms_type,
      id_hotel: room.id_hotel,
      room_number: room.room_number,
      status: room.status,
      price_per_night: room.price_per_night,
    }),
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error("Gagal memperbarui room");
  }

  return true;
}
