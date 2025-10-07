"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { RoomsHotels } from "../data/cabang";

interface RoomDetailModalProps {
  roomId: number;
  onClose: () => void;
}

export default function RoomDetailModal({
  roomId,
  onClose,
}: RoomDetailModalProps) {
  // Cari hotel dan kamar berdasarkan ID
  const hotel = RoomsHotels.find((h) =>
    h.rooms.some((r: any) => r.id === roomId)
  );

  if (!hotel) return null;

  const room = hotel.rooms.find((r: any) => r.id === roomId);
  if (!room) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-lg overflow-y-auto max-h-[90vh] relative">
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>

        {/* Konten Modal */}
        <div className="p-6 space-y-4">
          {/* Judul */}
          <h2 className="text-2xl font-bold text-gray-800">{room.name}</h2>

          {/* Galeri Kamar */}
          <div className="grid grid-cols-3 gap-3">
            {hotel.galeryRooms?.map((img: any, i: number) => (
              <Image
                key={i}
                src={img.src}
                alt={img.alt}
                width={300}
                height={200}
                className="rounded-xl object-cover w-full h-48"
              />
            ))}
          </div>

          {/* Deskripsi Hotel */}
          <p className="text-gray-600 mt-4">{hotel.description}</p>

          {/* Fasilitas */}
          <div>
            <h3 className="font-semibold mt-4 mb-2">Fasilitas:</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {room.facilities.map((f: string, i: number) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          {/* Opsi Harga */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Opsi Harga:</h3>
            <div className="space-y-3">
              {room.options.map((opt: any, i: number) => (
                <div
                  key={i}
                  className="border rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">
                      {opt.breakfast ? "Termasuk Sarapan" : "Tanpa Sarapan"}
                    </p>
                    <p className="text-sm text-gray-600">{opt.bed}</p>
                    <p className="text-xs text-gray-500">
                      {opt.refund ? "Bisa refund" : "Tidak bisa refund"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs line-through text-gray-400">
                      {opt.oldPrice}
                    </p>
                    <p className="text-lg font-bold text-red-600">
                      {opt.price}
                    </p>
                    <p className="text-xs text-red-500">{opt.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tombol Tutup */}
          <button
            onClick={onClose}
            className="mt-6 w-full bg-[var(--primary)] text-white py-2 rounded-xl hover:bg-red-800 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
