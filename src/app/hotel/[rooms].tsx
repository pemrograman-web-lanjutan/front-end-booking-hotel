"use client";

import Image from "next/image";
import BookingForm from "./[BookingForm]";
import RoomDetailModal from "./[RoomDetailModal]";
import { User } from "lucide-react";
import { useState } from "react";

export default function RoomsPages() {
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div className="bg-[var(--primary)] p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-white text-center mb-6">
        Rekomendasi Kamar Hotel Inferno di Kota
      </h1>

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white rounded-2xl p-6 border-4 border-[var(--primary)] shadow-md overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Room Oyo Jaya
          </h2>

          <div className="md:flex md:items-start gap-6">
            <div className="md:w-1/3 w-full">
              <div className="rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={"/hotel/ubud-1.jpeg"}
                  alt={"kaka"}
                  width={600}
                  height={600}
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <button
                onClick={() => setShowDetail(true)}
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
                    <tr className="border-t align-top">
                      <td className="p-4">
                        <div className="font-medium">
                          Tidak termasuk sarapan
                        </div>
                        <div className="text-sm text-gray-600">King</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Tidak bisa refund
                        </div>
                      </td>

                      <td className="p-4 text-center">
                        <div className="flex justify-center gap-1">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                      </td>

                      <td className="p-4 text-center">
                        <div className="text-xs text-gray-400 line-through">
                          Rp 400.000
                        </div>
                        <div className="text-red-600 font-bold text-lg">
                          Rp 350.000
                        </div>
                        <div className="text-xs text-red-500">
                          Harga spesial hari ini
                        </div>
                      </td>

                      <td className="p-4 text-center">
                        <button
                          onClick={() => setShowForm(true)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Pilih
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mt-4">
                <li>*</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {showForm && <BookingForm onClose={() => setShowForm(false)} />}
      {showDetail && <RoomDetailModal onClose={() => setShowDetail(false)} />}
    </div>
  );
}
