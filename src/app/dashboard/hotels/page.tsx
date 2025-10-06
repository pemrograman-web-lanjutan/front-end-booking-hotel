"use client";
import Navbar from "@/app/dashboard/components/Navbar";
import Sidebar from "../components/Sidebar";
import HotelsPages from "../components/HotelTable";

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
