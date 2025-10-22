"use client";

import { useState } from "react";

interface Hotel {
  id: number;
  name: string;
  branch: string;
  address: string;
  rating: number;
}

export default function HotelsPages() {
  const [hotels, setHotels] = useState<Hotel[]>([
    {
      id: 1,
      name: "Hotel Inferno Denpasar",
      branch: "Denpasar",
      address: "Jl. Gatot Subroto No. 45, Denpasar",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Hotel Inferno Badung",
      branch: "Badung",
      address: "Jl. Raya Kuta No. 12, Badung",
      rating: 4.2,
    },
    {
      id: 3,
      name: "Hotel Inferno Gianyar",
      branch: "Gianyar",
      address: "Jl. Raya Ubud No. 22, Gianyar",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Hotel Inferno Buleleng",
      branch: "Buleleng",
      address: "Jl. Lovina Beach No. 3, Buleleng",
      rating: 4.3,
    },
    {
      id: 5,
      name: "Hotel Inferno Karangasem",
      branch: "Karangasem",
      address: "Jl. Pantai Candidasa No. 8, Karangasem",
      rating: 4.6,
    },
  ]);

  const deleteHotel = (id: number) => {
    setHotels(hotels.filter((hotel) => hotel.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Informasi Hotel</h2>

      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2 text-left">Nama Hotel</th>
            <th className="border px-3 py-2 text-left">Cabang</th>
            <th className="border px-3 py-2 text-left">Alamat</th>
            <th className="border px-3 py-2 text-left">Rating</th>
            <th className="border px-3 py-2 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.id} className="hover:bg-gray-50">
              <td className="border px-3 py-2 font-medium">{hotel.name}</td>
              <td className="border px-3 py-2">{hotel.branch}</td>
              <td className="border px-3 py-2">{hotel.address}</td>
              <td className="border px-3 py-2">
                <span className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  {hotel.rating.toFixed(1)}
                </span>
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
