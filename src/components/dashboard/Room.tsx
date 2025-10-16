"use client";

import { useState } from "react";
import { RoomsHotels } from "../../app/data/cabang";

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
  const [rooms, setRooms] = useState(
    RoomsHotels.flatMap((hotel) =>
      hotel.rooms.map((room) => ({
        id: `${hotel.id}-${room.id}`,
        type: room.name,
        bedType: room.options[0]?.bed || "-",
        maxOccupancy: room.options[0]?.capacity || 0,
        amenities: room.facilities.join(", "),
        status: room.status,
      }))
    )
  );

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
