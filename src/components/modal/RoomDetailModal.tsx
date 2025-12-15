"use client";

import Image from "next/image";
import {
  X,
  Bed,
  Users,
  DollarSign,
  Wifi,
  AirVent,
  Monitor,
} from "lucide-react";
import { useState, useEffect } from "react";

interface RoomDetail {
  id: number;
  room_type_name: string;
  bed_type: string;
  description: string;
  max_occupancy: number;
  base_price_per_night: number;
  amenities: string;

  price_options: {
    id: number;
    name: string;
    details: string;
    is_refundable: boolean;
    original_price: number;
    discounted_price: number;
    status: string;
  }[];
}

interface RoomDetailModalProps {
  onClose: () => void;
  roomId: number;
  API_BASE_URL: string;
}

const defaultRoom: RoomDetail = {
  id: 0,
  room_type_name: "Memuat...",
  bed_type: "...",
  description: "Memuat detail kamar...",
  max_occupancy: 0,
  base_price_per_night: 0,
  amenities: "AC,WiFi,TV,Kulkas",
  price_options: [],
};

const amenityIcons: { [key: string]: React.ReactElement } = {
  Shower: <X size={16} className="mr-2 inline text-blue-500" />,
  Balkon: <Monitor size={16} className="mr-2 inline text-blue-500" />,
  Teras: <Monitor size={16} className="mr-2 inline text-blue-500" />,
  Kulkas: <DollarSign size={16} className="mr-2 inline text-blue-500" />,
  AC: <AirVent size={16} className="mr-2 inline text-blue-500" />,
  WiFi: <Wifi size={16} className="mr-2 inline text-blue-500" />,
};

export default function RoomDetailModal({
  onClose,
  roomId,
  API_BASE_URL,
}: RoomDetailModalProps) {
  const [roomData, setRoomData] = useState<RoomDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk memformat Rupiah
  const formatRupiah = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    if (!roomId) {
      setError("Room ID tidak valid.");
      setIsLoading(false);
      return;
    }

    const API_URL = `${API_BASE_URL}/rooms/${roomId}`;

    async function fetchRoomDetail() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        const result = await response.json();

        if (response.ok && result.data) {
          const data: RoomDetail = {
            ...result.data,
            base_price_per_night: result.data.price_per_night,
            price_options: result.data.price_options || [
              {
                id: 1,
                name: "Harga Dasar",
                details: "Tarif tanpa sarapan",
                is_refundable: false,
                original_price: result.data.price_per_night * 1.1,
                discounted_price: result.data.price_per_night,
                status: "Available",
              },
            ],
          };

          setRoomData(data);
        } else {
          setError(
            `Gagal memuat detail kamar: ${
              result.message || "Data tidak ditemukan"
            }`
          );
          setRoomData(null);
        }
      } catch (e) {
        console.error("Error fetching room detail:", e);
        setError("Terjadi kesalahan koneksi saat memuat detail kamar.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchRoomDetail();
  }, [roomId, API_BASE_URL]);

  const room = roomData || defaultRoom;
  const amenitiesArray = room.amenities
    ? room.amenities.split(",").map((a) => a.trim())
    : [];

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-3xl shadow-lg p-6 text-center">
          <p className="text-gray-700 font-medium">Memuat detail kamar...</p>
        </div>
      </div>
    );
  }

  if (error || !roomData) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-3xl shadow-lg p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-black">
            <X size={24} />
          </button>
          <p className="text-red-500 font-medium text-center">
            {error || "Detail kamar tidak dapat dimuat."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-lg overflow-y-auto max-h-[90vh] relative">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black z-10 p-2 bg-white rounded-full transition-colors duration-200 hover:bg-gray-100">
          <X size={24} />
        </button>

        {/* Konten utama */}
        <div className="p-6 space-y-5">
          {/* Judul & Detail Utama */}
          <div className="border-b pb-4">
            <h2 className="text-3xl font-bold text-gray-800">
              {room.room_type_name}
            </h2>
            <div className="text-gray-600 text-sm mt-1 flex items-center space-x-4">
              <p className="flex items-center">
                <Bed size={16} className="mr-1 text-gray-500" />
                {room.bed_type}
              </p>
              <p className="flex items-center">
                <Users size={16} className="mr-1 text-gray-500" />
                Maks {room.max_occupancy} orang
              </p>
            </div>
          </div>

          {/* Galeri Gambar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {/* Menggunakan image statis karena data API tidak menyertakan URL gambar */}
            <Image
              src="/hotel/ubud-4.jpeg"
              alt={`Foto Kamar ${room.room_type_name} 1`}
              width={300}
              height={200}
              className="rounded-xl object-cover w-full h-56 sm:h-48"
            />
            <Image
              src="/hotel/ubud-2.jpeg"
              alt={`Foto Kamar ${room.room_type_name} 2`}
              width={300}
              height={200}
              className="rounded-xl object-cover w-full h-56 sm:h-48"
            />
            <Image
              src="/hotel/ubud-3.jpeg"
              alt={`Foto Kamar ${room.room_type_name} 3`}
              width={300}
              height={200}
              className="rounded-xl object-cover w-full h-56 sm:h-48"
            />
          </div>

          {/* Deskripsi */}
          <div className="border-b pb-4">
            <h3 className="font-semibold mb-2 text-gray-800">
              Deskripsi Kamar
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {room.description}
            </p>
          </div>

          {/* Fasilitas */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-800">
              Fasilitas Kamar:
            </h3>
            <ul className="grid grid-cols-2 gap-y-2 text-gray-700 text-sm md:text-base">
              {amenitiesArray.length > 0 ? (
                amenitiesArray.map((amenity, index) => (
                  <li key={index} className="flex items-center">
                    {/* Menggunakan ikon dinamis jika ada map, atau ikon default */}
                    {amenityIcons[amenity] || (
                      <X
                        size={16}
                        className="mr-2 inline text-gray-500 rotate-45"
                      />
                    )}
                    {amenity}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">
                  Tidak ada fasilitas terdaftar.
                </li>
              )}
            </ul>
          </div>

          {/* Opsi Harga */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3 text-gray-800">Opsi Harga:</h3>
            <div className="space-y-3">
              {room.price_options.length > 0 ? (
                room.price_options.map((option) => (
                  <div
                    key={option.id}
                    className="border rounded-xl p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                    <div>
                      <p className="font-medium text-gray-800">{option.name}</p>
                      <p className="text-sm text-gray-600">{option.details}</p>
                      <p
                        className={`text-xs ${
                          option.is_refundable
                            ? "text-green-600"
                            : "text-red-500"
                        }`}>
                        {option.is_refundable
                          ? "Bisa Refund"
                          : "Tidak bisa refund"}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      {option.original_price > option.discounted_price && (
                        <p className="text-xs line-through text-gray-400">
                          {formatRupiah(option.original_price)}
                        </p>
                      )}
                      <p className="text-lg font-bold text-red-600">
                        {formatRupiah(option.discounted_price)}
                      </p>
                      <p
                        className={`text-xs font-medium ${
                          option.status === "Available"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}>
                        {option.status}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 p-4 border rounded-xl">
                  <p>
                    Tidak ada opsi harga spesifik. Harga dasar:{" "}
                    {formatRupiah(room.base_price_per_night)}
                  </p>
                </div>
              )}
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
