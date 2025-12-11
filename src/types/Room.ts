export interface Room {
  roomId: string;
  roomType: string;
  bedType: string;
  maxOccupancy: number;
  amenities: string;
  status: "available" | "occupied" | "maintenance";
}
