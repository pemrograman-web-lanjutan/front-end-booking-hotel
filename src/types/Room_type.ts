export interface RoomType {
  id: number;
  name: string;
  max_occupancy: number;
  amenities?: string | null;
  description?: string | null;
  bed_type: "single" | "double" | "twin" | "king" | "queen";
  price_per_night: number;
  created_at?: string;
  updated_at?: string;
}
