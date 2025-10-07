"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { RoomsHotels } from "../data/cabang";
import BookingForm from "../components/BookingForm";
import RoomDetailModal from "./RoomDetailModal";
import { useState } from "react";
import { User } from "lucide-react";

export default function RoomsPages() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city") ?? "";
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [showDetail, setShowDetail] = useState<number | null>(null);

  const hotel = RoomsHotels.find(
    (h) => h.city.toLowerCase() === city.toLowerCase()
  );

  if (!hotel) {
    return (
      <div className="p-6 min-h-screen bg-[var(--primary)] text-center text-white">
        <h1 className="text-2xl font-bold">Hotel tidak ditemukan di {city}</h1>
      </div>
    );
  }

  return (
    <div className="bg-[var(--primary)] p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-white text-center mb-6">
        Rekomendasi Kamar Hotel Inferno di {city}
      </h1>

      <div className="max-w-6xl mx-auto space-y-8">
        {hotel.rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-2xl p-6 border-4 border-[var(--primary)] shadow-md overflow-hidden"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {room.name}
            </h2>

            <div className="md:flex md:items-start gap-6">
              <div className="md:w-1/3 w-full">
                <div className="rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src={room.image ?? hotel.image}
                    alt={room.name}
                    width={600}
                    height={600}
                    className="w-full h-[500px] object-cover"
                  />
                </div>
                <button
                  onClick={() => setShowDetail(room.id)}
                  className="mt-4 w-full text-blue-500 py-2 rounded-xl hover:text-blue-700 transition hover:underline"
                >
                  Lihat Detail
                </button>
              </div>

              <div className="md:w-2/3 w-full">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700">
                        <th className="p-3 text-left">Tipe Kamar</th>
                        <th className="p-3 text-center">Tamu</th>
                        <th className="p-3 text-center">Harga/malam</th>
                        <th className="p-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {room.options?.map((opt, idx) => (
                        <tr key={idx} className="border-t align-top">
                          <td className="p-4">
                            <div className="font-medium">
                              {opt.breakfast
                                ? "Termasuk Sarapan"
                                : "Tidak termasuk sarapan"}
                            </div>
                            <div className="text-sm text-gray-600">
                              {opt.bed}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {opt.refund ? "Bisa refund" : "Tidak bisa refund"}
                            </div>
                          </td>

                          <td className="p-4 text-center">
                            <div className="flex justify-center gap-1">
                              {[...Array(opt.capacity)].map((_, i) => (
                                <User
                                  key={i}
                                  className="w-5 h-5 text-gray-600"
                                />
                              ))}
                            </div>
                          </td>

                          <td className="p-4 text-center">
                            <div className="text-xs text-gray-400 line-through">
                              {opt.oldPrice}
                            </div>
                            <div className="text-red-600 font-bold text-lg">
                              {opt.price}
                            </div>
                            <div className="text-xs text-red-500">
                              {opt.note}
                            </div>
                          </td>

                          <td className="p-4 text-center">
                            <button
                              onClick={() => setSelectedRoomId(room.id)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                              Pilih
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mt-4">
                  {(room.facilities ?? hotel.facilities).map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedRoomId && (
        <BookingForm
          roomId={selectedRoomId}
          onClose={() => setSelectedRoomId(null)}
        />
      )}

      {showDetail && (
        <RoomDetailModal
          roomId={showDetail}
          onClose={() => setShowDetail(null)}
        />
      )}
    </div>
  );
}
