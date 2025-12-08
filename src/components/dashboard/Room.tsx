"use client";

import { useState } from "react";
import RoomModal from "../modal/ModalFormRoom";
import { Room } from "../../types/Room";

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
      roomId: "1",
      roomType: "Deluxe Room",
      bedType: "Queen",
      maxOccupancy: 2,
      amenities: "WiFi, AC, TV, Shower",
      status: "available",
    },
    {
      roomId: "2",
      roomType: "Suite Room",
      bedType: "King",
      maxOccupancy: 3,
      amenities: "WiFi, AC, TV, Bathtub, Mini Bar",
      status: "maintenance",
    },
    {
      roomId: "3",
      roomType: "Standard Room",
      bedType: "Twin",
      maxOccupancy: 2,
      amenities: "WiFi, AC, TV",
      status: "occupied",
    },
  ]);

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreate = () => {
    setSelectedRoom(null);
    setModalOpen(true);
  };

  const handleEdit = (room: Room) => {
    setSelectedRoom(room);
    setModalOpen(true);
  };

  const handleSubmit = (room: Room) => {
    if (selectedRoom) {
      setRooms(rooms.map((r) => (r.roomId === room.roomId ? room : r)));
    } else {
      setRooms([...rooms, room]);
    }
  };

  const deleteRoom = (id: string) => {
    setRooms(rooms.filter((room) => room.roomId !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Rooms</h2>
      <button
        onClick={handleCreate}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md">
        Create Room
      </button>
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
              <tr key={room.roomId} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{room.roomId}</td>
                <td className="border px-3 py-2">{room.roomType}</td>
                <td className="border px-3 py-2">{room.bedType}</td>
                <td className="border px-3 py-2">{room.maxOccupancy}</td>
                <td className="border px-3 py-2">{room.amenities}</td>
                <td className={`border px-3 py-2 font-medium ${color}`}>
                  {label}
                </td>
                <td className="border px-3 py-2 text-center">
                  <button
                    onClick={() => handleEdit(room)}
                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md mr-2">
                    Edit
                  </button>
                  <button
                    onClick={() => deleteRoom(room.roomId)}
                    className="px-3 py-1 text-xs bg-red-600 text-white rounded-md">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <RoomModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedRoom}
      />
    </div>
  );
}
