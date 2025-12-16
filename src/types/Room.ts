export interface RoomFilter {
  hotel_id: number,
  nama_hotel: string,
  room_type_id: number,
  room_id: number,
  room_number: string,
  max_occupancy: number,
  cabang_hotel: string,
  room_status: string,
  price_per_night: number,
  amenities: string,
}

export interface RoomDetail {
  id: number;
  id_rooms_type: number;
  id_hotel: number;
  room_number: string;
  nama_hotel: string;
  status: "maintenance" | "occupied" | "available";
  price_per_night: number;
}
