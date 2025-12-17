"use client";

import { useState, useEffect } from "react";
import RoomModal from "../modal/ModalFormRoom";
import { RoomTable } from "../../types/Room";
import { getRoomsForDashboard } from "@/app/functions/getRooms";

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
    case "occupied":
      return { label: "Occupied", color: "text-blue-600" };
    default:
      return { label: status, color: "text-gray-600" };
  }
};

export default function RoomsPage() {
  const [rooms, setRooms] = useState<RoomTable[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<RoomTable | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    const data = await getRoomsForDashboard();
    setRooms(data);
    setLoading(false);
  };

  const handleCreate = () => {
    setSelectedRoom(null);
    setModalOpen(true);
  };

  const handleEdit = (room: RoomTable) => {
    setSelectedRoom(room);
    setModalOpen(true);
  };

  const handleSubmit = (room: RoomTable) => {
    // Optimistic update or refetch
    fetchRooms();
    setModalOpen(false);
  };

  const deleteRoom = (id: number) => {
    // Implement delete logic here or calling an API
    console.log("Deleting room with id:", id);
    setRooms(rooms.filter((room) => room.id !== id));
  };

  if (loading) {
    return <div className="p-6">Loading rooms...</div>;
  }

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
            <th className="border px-3 py-2 text-left">ID</th>
            <th className="border px-3 py-2 text-left">Room Number</th>
            <th className="border px-3 py-2 text-left">Hotel ID</th>
            <th className="border px-3 py-2 text-left">Room Type ID</th>
            <th className="border px-3 py-2 text-left">Status</th>
            <th className="border px-3 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length > 0 ? (
            rooms.map((room) => {
              const { label, color } = getStatusLabel(room.status);
              return (
                <tr key={room.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{room.id}</td>
                  <td className="border px-3 py-2">{room.room_number}</td>
                  <td className="border px-3 py-2">{room.id_hotel}</td>
                  <td className="border px-3 py-2">{room.id_rooms_type}</td>
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
                      onClick={() => deleteRoom(room.id)}
                      className="px-3 py-1 text-xs bg-red-600 text-white rounded-md">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} className="border px-3 py-2 text-center">
                No rooms found.
              </td>
            </tr>
          )}
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
