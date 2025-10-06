"use client";

import { useState } from "react";
import { RoomsHotels } from "../../data/cabang";

type HotelStatus = "available" | "maintenance" | "closed" | "fully_booked";

export default function HotelsPages() {
  const [hotels, setHotels] = useState(RoomsHotels);

  const deleteHotel = (id: number) => {
    setHotels(hotels.filter((hotel) => hotel.id !== id));
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return "Siap";
      case "maintenance":
        return "Perawatan";
      case "closed":
        return "Tutup";
      case "fully_booked":
        return "Penuh";
      default:
        return status;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Informasi Hotel</h2>

      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2 text-left">Nama Hotel</th>
            <th className="border px-3 py-2 text-left">Alamat</th>
            <th className="border px-3 py-2 text-left">Rating</th>
            <th className="border px-3 py-2 text-left">Status</th>
            <th className="border px-3 py-2 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.id} className="hover:bg-gray-50">
              <td className="border px-3 py-2 font-medium">{hotel.branch}</td>
              <td className="border px-3 py-2">{hotel.address}</td>
              <td className="border px-3 py-2">
                <span className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  {hotel.rating.toFixed(1)}
                </span>
              </td>
              <td
                className={`border px-3 py-2 font-medium ${
                  hotel.status === "available"
                    ? "text-green-600"
                    : hotel.status === "maintenance"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}>
                {getStatusLabel(hotel.status)}
              </td>
              <td className="border px-3 py-2 text-center">
                <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md mr-2">
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
    </div>
  );
}
