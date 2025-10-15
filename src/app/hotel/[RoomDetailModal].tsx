"use client";

import Image from "next/image";
import { X } from "lucide-react";

interface RoomDetailModalUIProps {
  onClose: () => void;
}

export default function RoomDetailModal({ onClose }: RoomDetailModalUIProps) {
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
          <h2 className="text-2xl font-bold text-gray-800">[Nama Kamar]</h2>

          {/* Galeri Kamar */}
          <div className="grid grid-cols-3 gap-3">
            <Image
              src="/placeholder1.jpg"
              alt="Foto Kamar"
              width={300}
              height={200}
              className="rounded-xl object-cover w-full h-48"
            />
            <Image
              src="/placeholder2.jpg"
              alt="Foto Kamar"
              width={300}
              height={200}
              className="rounded-xl object-cover w-full h-48"
            />
            <Image
              src="/placeholder3.jpg"
              alt="Foto Kamar"
              width={300}
              height={200}
              className="rounded-xl object-cover w-full h-48"
            />
          </div>

          {/* Deskripsi */}
          <p className="text-gray-600 mt-4">
            [Deskripsi singkat kamar akan ditampilkan di sini.]
          </p>

          {/* Fasilitas */}
          <div>
            <h3 className="font-semibold mt-4 mb-2">Fasilitas:</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>[Fasilitas 1]</li>
              <li>[Fasilitas 2]</li>
              <li>[Fasilitas 3]</li>
            </ul>
          </div>

          {/* Opsi Harga */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Opsi Harga:</h3>
            <div className="space-y-3">
              <div className="border rounded-xl p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    [Termasuk Sarapan / Tanpa Sarapan]
                  </p>
                  <p className="text-sm text-gray-600">[Jenis Tempat Tidur]</p>
                  <p className="text-xs text-gray-500">[Kebijakan Refund]</p>
                </div>
                <div className="text-right">
                  <p className="text-xs line-through text-gray-400">
                    [Harga Lama]
                  </p>
                  <p className="text-lg font-bold text-red-600">
                    [Harga Sekarang]
                  </p>
                  <p className="text-xs text-red-500">[Catatan Harga]</p>
                </div>
              </div>
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
