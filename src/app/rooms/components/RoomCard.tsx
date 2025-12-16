import Image from "next/image";
import { useState } from "react";
import { RoomFilter } from "@/types/Room";
import BookingFormModal from "@/components/modal/BookingFormModal";

interface RoomCardProps {
  room: RoomFilter;
}

export default function RoomCard({ room }: RoomCardProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="relative border rounded-2xl shadow-lg overflow-hidden bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
        <div className="relative w-full h-56 flex-shrink-0 overflow-hidden">
          <Image
            src={"/hotel/canggu-1.png"}
            alt={room.nama_hotel}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          {room.room_status === 'available' && (
            <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
              Tersedia
            </div>
          )}
          <div className="absolute bottom-3 left-3 text-white">
            <h2 className="font-bold text-xl drop-shadow-lg">{room.nama_hotel}</h2>
            <p className="text-sm opacity-90 drop-shadow">{room.cabang_hotel}</p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">👥 Max {room.max_occupancy} orang</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-2xl text-gray-900">
                Rp {room.price_per_night.toLocaleString()}
              </span>
              <p className="text-sm text-gray-500">per malam</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {room.amenities.split(',').map((amenity, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
              >
                {amenity.trim()}
              </span>
            ))}
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="w-full bg-gradient-to-r from-[var(--primary)] to-red-600 text-white py-3 px-6 rounded-xl hover:from-red-600 hover:to-[var(--primary)] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
          >
            📅 Pesan Sekarang
          </button>
        </div>
      </div>

      <BookingFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        roomId={room.room_id}
      />
    </>
  );
}
