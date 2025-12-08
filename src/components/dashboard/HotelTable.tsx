"use client";

import { useState } from "react";
import { Hotel } from "../../types/Hotel";
import HotelModal from "../modal/ModalFormHotels";

export default function HotelsPages() {
  const [hotels, setHotels] = useState<Hotel[]>([
    {
      id: 1,
      nama_hotel: "Hotel Inferno Denpasar",
      cabang_hotel: "Denpasar",
      alamat_hotel: "Jl. Gatot Subroto No. 45, Denpasar",
      lat: -8.65,
      lng: 115.216667,
      // rating: 4.5,
    },
    {
      id: 2,
      nama_hotel: "Hotel Inferno Badung",
      cabang_hotel: "Badung",
      alamat_hotel: "Jl. Raya Kuta No. 12, Badung",
      lat: -8.72,
      lng: 115.168333,
    },
  ]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreate = () => {
    setSelectedHotel(null);
    setModalOpen(true);
  };

  const handleEdit = (room: Hotel) => {
    setSelectedHotel(room);
    setModalOpen(true);
  };

  const handleSubmit = (hotel: Hotel) => {
    if (selectedHotel) {
      setHotels(hotels.map((r) => (r.id === hotel.id ? hotel : r)));
    } else {
      setHotels([...hotels, hotel]);
    }
  };

  const deleteHotel = (id: number) => {
    setHotels(hotels.filter((hotel) => hotel.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Informasi Hotel</h2>

      <button
        onClick={handleCreate}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md">
        Create Hotel
      </button>

      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2 text-left">Nama Hotel</th>
            <th className="border px-3 py-2 text-left">Cabang</th>
            <th className="border px-3 py-2 text-left">Alamat</th>
            {/* <th className="border px-3 py-2 text-left">Rating</th> */}
            <th className="border px-3 py-2 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.id} className="hover:bg-gray-50">
              <td className="border px-3 py-2 font-medium">
                {hotel.nama_hotel}
              </td>
              <td className="border px-3 py-2">{hotel.cabang_hotel}</td>
              <td className="border px-3 py-2">{hotel.alamat_hotel}</td>
              {/* <td className="border px-3 py-2">
                <span className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  {hotel.rating.toFixed(1)}
                </span>
              </td> */}
              <td className="border px-3 py-2 text-center">
                <button
                  onClick={() => handleEdit(hotel)}
                  className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md mr-2">
                  Edit
                </button>
                <button
                  onClick={() => deleteHotel(hotel.id)}
                  className="px-3 py-1 text-xs bg-red-600 text-white rounded-md">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <HotelModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedHotel}
      />
    </div>
  );
}
