"use client";

import Image from "next/image";
import { X } from "lucide-react";

interface RoomDetailModalUIProps {
  onClose: () => void;
}

export default function RoomDetailModal({ onClose }: RoomDetailModalUIProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-lg overflow-y-auto max-h-[90vh] relative">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black">
          <X size={24} />
        </button>

        {/* Konten utama */}
        <div className="p-6 space-y-5">
          {/* Judul */}
          <h2 className="text-2xl font-bold text-gray-800 text-center md:text-left">
            Delux
          </h2>

          {/* Galeri Gambar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <Image
              src="/hotel/ubud-4.jpeg"
              alt="Foto Kamar"
              width={300}
              height={200}
              className="rounded-xl object-cover w-full h-56 sm:h-48"
            />
            <Image
              src="/hotel/ubud-2.jpeg"
              alt="Foto Kamar"
              width={300}
              height={200}
              className="rounded-xl object-cover w-full h-56 sm:h-48"
            />
            <Image
              src="/hotel/ubud-3.jpeg"
              alt="Foto Kamar"
              width={300}
              height={200}
              className="rounded-xl object-cover w-full h-56 sm:h-48"
            />
          </div>

          {/* Deskripsi */}
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            Inferno Hotel Ubud menghadirkan suasana tenang di tengah alam Bali.
            Kamar nyaman dilengkapi AC, WiFi, dan balkon dengan pemandangan
            tropis. Cocok untuk wisatawan yang mencari ketenangan.
          </p>

          {/* Fasilitas */}
          <div>
            <h3 className="font-semibold mt-4 mb-2 text-gray-800">
              Fasilitas:
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm md:text-base">
              <li>Shower</li>
              <li>Balkon / teras</li>
              <li>Kulkas</li>
              <li>AC</li>
              <li>Kolam renang</li>
            </ul>
          </div>

          {/* Opsi Harga */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3 text-gray-800">Opsi Harga:</h3>
            <div className="space-y-3">
              <div className="border rounded-xl p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                  <p className="font-medium text-gray-800">Include Breakfast</p>
                  <p className="text-sm text-gray-600">Double Bed</p>
                  <p className="text-xs text-gray-500">Tidak bisa refund</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs line-through text-gray-400">
                    Rp 400.000
                  </p>
                  <p className="text-lg font-bold text-red-600">Rp 350.000</p>
                  <p className="text-xs text-red-500">Tersedia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tombol Tutup */}
          <button
            onClick={onClose}
            className="mt-6 w-full bg-[var(--primary)] text-white py-3 rounded-xl hover:bg-red-800 transition">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
