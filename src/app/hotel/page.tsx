"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import DetailHotel from "../components/detailHotel";
import RoomHotel from "../components/roomHotel";
import RoomsHotels from "../components/rooms";
export default function HotelsPage() {
  return (
    <div>
      <Navbar />
      <DetailHotel />
      <RoomHotel />
      <RoomsHotels />
    </div>
  );
}
