"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import DetailHotel from "../components/detailHotel";
import RoomHotel from "../components/roomHotel";
import RoomsHotels from "../components/rooms";
import UlasanList from "../components/UlasanList";
export default function HotelsPage() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  return (
    <div>
      <Navbar />
      <DetailHotel />
      <RoomHotel />
      <RoomsHotels />
      {city && <UlasanList city={city} />}
    </div>
  );
}
