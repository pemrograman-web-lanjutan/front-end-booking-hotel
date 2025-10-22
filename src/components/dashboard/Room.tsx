"use client";

import { useState } from "react";

interface Room {
  id: string;
  type: string;
  bedType: string;
  maxOccupancy: number;
  amenities: string;
  status: string;
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "available":
      return { label: "Available", color: "text-green-600" };
    case "few_left":
      return { label: "Few Left", color: "text-yellow-600" };
    case "fully_booked":
      return { label: "Fully Booked", color: "text-red-600" };
    case "maintenance":
      return { label: "Maintenance", color: "text-gray-500" };
    default:
      return { label: status, color: "text-gray-600" };
  }
};

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: "1",
      type: "Deluxe Room",
      bedType: "Queen",
      maxOccupancy: 2,
      amenities: "WiFi, AC, TV, Shower",
      status: "available",
    },
    {
      id: "2",
      type: "Suite Room",
      bedType: "King",
      maxOccupancy: 3,
      amenities: "WiFi, AC, TV, Bathtub, Mini Bar",
      status: "few_left",
    },
    {
      id: "3",
      type: "Standard Room",
      bedType: "Twin",
      maxOccupancy: 2,
      amenities: "WiFi, AC, TV",
      status: "fully_booked",
    },
  ]);

  const deleteRoom = (id: string) => {
    setRooms(rooms.filter((room) => room.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Rooms</h2>
      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2 text-left">Room ID</th>
            <th className="border px-3 py-2 text-left">Room Type</th>
            <th className="border px-3 py-2 text-left">Bed Type</th>
            <th className="border px-3 py-2 text-left">Max Occupancy</th>
            <th className="border px-3 py-2 text-left">Amenities</th>
            <th className="border px-3 py-2 text-left">Status</th>
            <th className="border px-3 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => {
            const { label, color } = getStatusLabel(room.status);
            return (
              <tr key={room.id} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{room.id}</td>
                <td className="border px-3 py-2">{room.type}</td>
                <td className="border px-3 py-2">{room.bedType}</td>
                <td className="border px-3 py-2">{room.maxOccupancy}</td>
                <td className="border px-3 py-2">{room.amenities}</td>
                <td className={`border px-3 py-2 font-medium ${color}`}>
                  {label}
                </td>
                <td className="border px-3 py-2 text-center">
                  <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md mr-2">
                    Edit
                  </button>
                  <button
                    onClick={() => deleteRoom(room.id)}
                    className="px-3 py-1 text-xs bg-red-600 text-white rounded-md">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
