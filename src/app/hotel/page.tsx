"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import DetailHotel from "./[detailHotel]";
import RoomHotel from "./[roomHotel]";
import RoomsHotels from "./[rooms]";
import UlasanList from "./[UlasanList]";
export default function HotelsPage() {
  return (
    <div>
      <Navbar />
      <DetailHotel />
      <RoomHotel />
      <RoomsHotels />
      <UlasanList />
    </div>
  );
}
