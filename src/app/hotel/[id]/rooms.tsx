"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import BookingForm from "@/components/modal/BookingFormModal";

import RoomDetailModal from "../../../components/modal/RoomDetailModal";
import { User } from "lucide-react";
import { useState, useEffect } from "react";
import { DetailRooms } from "../../../types/DetailRooms";

export default function RoomsPages() {
  const params = useParams();
  const hotelId = params?.id as string;

  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const [selectedBookingRoom, setSelectedBookingRoom] = useState<{
    id: number;
    room_type_name: string;
    price_per_night: number;
    room_number: string;
  } | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null); // For Detail Modal
  const [rooms, setRooms] = useState<DetailRooms[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = "http://localhost:8000/api/hotel";

  const formatRupiah = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    if (!hotelId) return;

    const API_URL = `${API_BASE_URL}/${hotelId}/rooms`;

    async function fetchRooms() {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();

        if (response.ok && result.data) {
          setRooms(result.data);
        } else {
          console.error(
            "Gagal mengambil data kamar:",
            result.message || result
          );
          setRooms([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRooms();
  }, [hotelId]);

  if (isLoading || !hotelId) {
    return (
      <div className="bg-[var(--primary)] p-10 min-h-screen text-center text-white text-lg">
        Memuat daftar kamar...
      </div>
    );
  }

  return (
    <div className="bg-[var(--primary)] p-4 sm:p-6 lg:p-10 min-h-screen">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center mb-6">
        Rekomendasi Kamar Hotel
      </h1>

      <div className="max-w-6xl mx-auto space-y-8">
        {rooms.length === 0 && (
          <div className="text-center text-white text-lg">
            Tidak ada kamar tersedia.
          </div>
        )}

        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-2xl p-4 sm:p-6 border-4 border-[var(--primary)] shadow-md overflow-hidden">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              {room.room_type_name || "Tipe Kamar Tidak Diketahui"} (
              {room.bed_type})
            </h2>

            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Image Section */}
              <div className="md:w-1/3 w-full">
                <div className="rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src={"/hotel/ubud-4.jpeg"}
                    alt={`Kamar ${room.room_type_name}`}
                    width={600}
                    height={600}
                    className="w-full h-[250px] sm:h-[350px] md:h-[500px] object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <button
                  onClick={() => {
                    setShowDetail(true);
                    setSelectedRoomId(room.id);
                  }}
                  className="mt-4 w-full text-blue-500 py-2 rounded-xl hover:text-blue-700 transition hover:underline">
                  Lihat Detail
                </button>
              </div>

              {/* Details Section */}
              <div className="md:w-2/3 w-full">
                {/* Mobile Amenities */}
                <div className="block md:hidden mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Fasilitas Kamar
                  </h3>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    {room.amenities &&
                      room.amenities
                        .split(",")
                        .map((amenity, i) => <li key={i}>{amenity.trim()}</li>)}
                  </ul>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700">
                        <th className="p-3 text-left">Tipe Kamar</th>
                        <th className="p-3 text-center">Tamu Maks</th>
                        <th className="p-3 text-center">Harga/malam</th>
                        <th className="p-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t align-top">
                        <td className="p-4">
                          <div className="font-medium">
                            {room.description || "Tanpa Deskripsi"}
                          </div>
                          <div className="text-sm text-gray-600">
                            {room.bed_type}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Kamar No. {room.room_number} | Status: {room.status}
                          </div>
                        </td>

                        <td className="p-4 text-center">
                          <div className="relative flex justify-center group">
                            {" "}
                            {[...Array(room.max_occupancy)].map((_, index) => (
                              <User
                                key={index}
                                className="w-5 h-5 text-gray-600"
                              />
                            ))}
                            {/* Tooltip tetap sama */}
                            <span className="absolute bottom-6 text-xs bg-gray-800 text-white rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              Max: {room.max_occupancy} orang
                            </span>
                          </div>
                        </td>

                        <td className="p-4 text-center">
                          <div className="text-red-600 font-bold text-lg">
                            {formatRupiah(room.price_per_night)}
                          </div>
                          <div className="text-xs text-red-500">
                            Harga per malam
                          </div>
                        </td>

                        <td className="p-4 text-center">
                          <button
                            onClick={() => {
                              setSelectedBookingRoom({
                                id: room.id,
                                room_type_name: room.room_type_name,
                                price_per_night: room.price_per_night,
                                room_number: room.room_number,
                              });
                              setShowForm(true);
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Pilih
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card */}
                <div className="md:hidden border border-gray-300 rounded-xl p-4 space-y-4">
                  <div>
                    <div className="font-medium">
                      {room.description || "Tanpa Deskripsi"}
                    </div>
                    <div className="text-sm text-gray-600">{room.bed_type}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Kamar No. {room.room_number}
                    </div>
                  </div>

                  <div className="flex justify-start items-center gap-2">
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-700">
                      Max: {room.max_occupancy} orang
                    </span>
                  </div>

                  <div className="border-t pt-3">
                    <div className="text-red-600 font-bold text-lg">
                      {formatRupiah(room.price_per_night)}
                    </div>
                    <div className="text-xs text-red-500">Harga per malam</div>
                    <button
                      onClick={() => {
                        setSelectedBookingRoom({
                          id: room.id,
                          room_type_name: room.room_type_name,
                          price_per_night: room.price_per_night,
                          room_number: room.room_number,
                        });
                        setShowForm(true);
                      }}
                      className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm">
                      Pilih
                    </button>
                  </div>
                </div>

                {/* Desktop Amenities */}
                <div className="hidden md:block">
                  <h3 className="font-semibold text-gray-800 mt-6 mb-2">
                    Fasilitas Kamar
                  </h3>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    {room.amenities &&
                      room.amenities
                        .split(",")
                        .map((amenity, i) => <li key={i}>{amenity.trim()}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <BookingForm
          open={showForm}
          onClose={() => setShowForm(false)}
          room={selectedBookingRoom}
        />
      )}

      {showDetail && selectedRoomId && (
        <RoomDetailModal
          onClose={() => {
            setShowDetail(false);
            setSelectedRoomId(null);
          }}
          roomId={selectedRoomId}
          API_BASE_URL={API_BASE_URL}
        />
      )}
    </div>
  );
}
