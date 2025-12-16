export type Booking = {
  id: string;
  user_id: string;
  room_id: string;
  check_in: string;
  check_out: string;
  booking_status: "pending" | "confirmed" | "cancelled" | "completed";
  total_amount: number;
  payment_status: "pending" | "paid" | "refunded";
  booking_date: string;
  cancellation_date?: string;
  total_nights: number;
};
