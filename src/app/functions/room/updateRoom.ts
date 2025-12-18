import { RoomType } from "@/types/Room_type";

interface UpdateRoomPayload {
  id_hotel: number;
  room_number: string;
  status: "available" | "occupied" | "maintenance";
}

export async function updateRoom(
  id: number,
  roomType: RoomType,
  payload: UpdateRoomPayload
): Promise<boolean> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      id_rooms_type: roomType.id,
      id_hotel: payload.id_hotel,
      room_number: payload.room_number,
      status: payload.status,
      price_per_night: roomType.price_per_night,
    }),
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error("Gagal memperbarui room");
  }

  return true;
}
