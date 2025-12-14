"use client";

import Image from "next/image";
import BookingForm from "../[id]/[BookingForm]";
import RoomDetailModal from "../[id]/[RoomDetailModal]";
import { User } from "lucide-react";
import { useState } from "react";

export default function RoomsPages() {
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="bg-[var(--primary)] p-4 sm:p-6 lg:p-10 min-h-screen">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center mb-6">
        Rekomendasi Kamar Hotel Inferno di Kota
      </h1>

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white rounded-2xl p-4 sm:p-6 border-4 border-[var(--primary)] shadow-md overflow-hidden">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Deluxe
          </h2>

          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Gambar Kamar */}
            <div className="md:w-1/3 w-full">
              <div className="rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={"/hotel/ubud-4.jpeg"}
                  alt={"Kamar Deluxe"}
                  width={600}
                  height={600}
                  className="w-full h-[250px] sm:h-[350px] md:h-[500px] object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <button
                onClick={() => setShowDetail(true)}
                className="mt-4 w-full text-blue-500 py-2 rounded-xl hover:text-blue-700 transition hover:underline">
                Lihat Detail
              </button>
            </div>

            {/* Detail Kamar */}
            <div className="md:w-2/3 w-full">
              {/* Fasilitas tampil di atas saat mobile */}
              <div className="block md:hidden mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Fasilitas Kamar
                </h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Shower</li>
                  <li>Balkon / teras</li>
                  <li>Kulkas</li>
                  <li>AC</li>
                  <li>Kolam renang</li>
                </ul>
              </div>

              {/* Tabel responsif */}
              <div className="hidden md:block overflow-x-auto">
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
                        <div className="font-medium">Include Breakfast</div>
                        <div className="text-sm text-gray-600">Double Bed</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Tidak bisa refund
                        </div>
                      </td>

                      <td className="p-4 text-center">
                        <div className="relative flex justify-center group">
                          <User className="w-5 h-5 text-gray-600 cursor-pointer group-hover:text-blue-600 transition" />
                          <span className="absolute bottom-6 text-xs bg-gray-800 text-white rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            1 orang
                          </span>
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
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          Pilih
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Kartu versi mobile */}
              <div className="md:hidden border border-gray-300 rounded-xl p-4 space-y-4">
                <div>
                  <div className="font-medium">Include Breakfast</div>
                  <div className="text-sm text-gray-600">Double Bed</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Tidak bisa refund
                  </div>
                </div>

                <div className="flex justify-start items-center gap-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">1 orang</span>
                </div>

                <div className="border-t pt-3">
                  <div className="text-xs text-gray-400 line-through">
                    Rp 400.000
                  </div>
                  <div className="text-red-600 font-bold text-lg">
                    Rp 350.000
                  </div>
                  <div className="text-xs text-red-500">
                    Harga spesial hari ini
                  </div>
                  <button
                    onClick={() => setShowForm(true)}
                    className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm">
                    Pilih
                  </button>
                </div>
              </div>

              {/* Fasilitas bawah hanya muncul di desktop */}
              <div className="hidden md:block">
                <h3 className="font-semibold text-gray-800 mt-6 mb-2">
                  Fasilitas Kamar
                </h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Shower</li>
                  <li>Balkon / teras</li>
                  <li>Kulkas</li>
                  <li>AC</li>
                  <li>Kolam renang</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showForm && <BookingForm onClose={() => setShowForm(false)} />}
      {showDetail && <RoomDetailModal onClose={() => setShowDetail(false)} />}
    </div>
  );
}
