"use client";
import HotelBookingReport from "../components/hotels";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Reports() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y">
        <Navbar />
        <HotelBookingReport />
      </div>
    </div>
  );
}
