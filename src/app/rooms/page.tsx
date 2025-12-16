"use client";

import { useEffect } from "react";
import RoomCard from "@/app/rooms/components/RoomCard";
import SearchForm from "@/app/rooms/components/SearchForm";
import { useRoomsStore } from "@/store/useRoomsStore";
import Navbar from "@/components/Navbar";
import RoomsPages from "../hotel/[id]/[rooms]";

export default function RoomsPage() {
  const { rooms, loading, error, searchRooms } = useRoomsStore();

  useEffect(() => {
    searchRooms();
  }, [searchRooms]);

  return (
    <div className="bg-[var(--primary)]">
      <Navbar />
      <div className="px-6 pt-[6rem] pb-6">
        <h1 className="text-[var(--secondary)] text-3xl font-bold mb-6">
          Daftar Kamar
        </h1>

        {/* SEARCH FORM */}
        <SearchForm />

        {loading && <div className="text-center py-10">Mencari kamar...</div>}

        {error && (
          <p className="text-center text-red-500 py-10">Error: {error}</p>
        )}

        {!loading && !error && rooms.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            Tidak ada kamar yang cocok dengan pencarian Anda.
          </p>
        )}

        {/* GRID CARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room: any) => (
            <RoomCard key={room.room_id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
}
