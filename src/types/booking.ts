export type Booking = {
  id: string;
  //   user_id: number;
  //   room_id: number;
  nama_tamu: string;
  room: string;
  checkin: string;
  checkout: string;
  status_booking: "pending" | "confirmed" | "cancelled" | "completed";
};
