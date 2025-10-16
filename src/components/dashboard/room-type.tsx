"use client";

import { useState } from "react";

type RoomType = {
  id: number;
  name: string;
  description: string;
  basePrice: number;
};

export default function RoomTypesPage() {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([
    {
      id: 1,
      name: "Standard",
      description: "Simple room with essential amenities",
      basePrice: 500000,
    },
    {
      id: 2,
      name: "Deluxe",
      description: "Spacious room with queen bed and balcony",
      basePrice: 850000,
    },
    {
      id: 3,
      name: "Suite",
      description: "Luxury suite with living area and premium service",
      basePrice: 1500000,
    },
  ]);

  const deleteType = (id: number) => {
    setRoomTypes(roomTypes.filter((t) => t.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Room Types</h2>

      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2 text-left">ID</th>
            <th className="border px-3 py-2 text-left">Name</th>
            <th className="border px-3 py-2 text-left">Description</th>
            <th className="border px-3 py-2 text-left">Base Price</th>
            <th className="border px-3 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roomTypes.map((type) => (
            <tr key={type.id} className="hover:bg-gray-50">
              <td className="border px-3 py-2">{type.id}</td>
              <td className="border px-3 py-2">{type.name}</td>
              <td className="border px-3 py-2">{type.description}</td>
              <td className="border px-3 py-2">
                Rp {type.basePrice.toLocaleString("id-ID")}
              </td>
              <td className="border px-3 py-2 text-center">
                <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md mr-2">
                  Edit
                </button>
                <button
                  onClick={() => deleteType(type.id)}
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
