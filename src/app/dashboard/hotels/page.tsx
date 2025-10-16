"use client";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "../../../components/dashboard/Sidebar";
import HotelsPages from "../../../components/dashboard/HotelTable";

export default function HotelsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y">
        <Navbar />
        <HotelsPages />
      </div>
    </div>
  );
}
