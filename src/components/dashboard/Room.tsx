"use client";

import { useState, useEffect } from "react";
import RoomModal from "../modal/ModalFormRoom";
import { RoomDetail } from "@/types/Room";
import { addRoom } from "@/app/functions/room/addRoom";
import { updateRoom } from "@/app/functions/room/updateRoom";
import { deleteRoom } from "@/app/functions/room/deleteRoom";

/* ===================== STATUS HELPER ===================== */
const getStatusLabel = (status: RoomDetail["status"]) => {
  switch (status) {
    case "available":
      return { label: "Available", color: "text-green-600" };
    case "occupied":
      return { label: "Occupied", color: "text-red-600" };
    case "maintenance":
      return { label: "Maintenance", color: "text-gray-500" };
    default:
      return { label: status, color: "text-gray-600" };
  }
};

interface Props {
  rooms: RoomDetail[];
  onRefresh?: () => void;
}

export default function Room({ rooms, onRefresh }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomDetail | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const safeRooms = Array.isArray(rooms) ? rooms : [];

  /* ===================== CREATE ===================== */
  const handleCreate = () => {
    setSelectedRoom(null);
    setModalOpen(true);
  };

  /* ===================== EDIT ===================== */
  const handleEdit = (room: RoomDetail) => {
    setSelectedRoom(room);
    setModalOpen(true);
  };

  /* ===================== SUBMIT ===================== */
  const handleSubmit = async (roomData: RoomDetail) => {
    setSaving(true);
    try {
      if (selectedRoom) {
        await updateRoom(selectedRoom.id, roomData);
        alert("Room berhasil diperbarui");
      } else {
        await addRoom(roomData);
        alert("Room berhasil ditambahkan");
      }

      setModalOpen(false);
      setSelectedRoom(null);
      onRefresh?.();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan room");
    } finally {
      setSaving(false);
    }
  };

  /* ===================== DELETE ===================== */
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus room ini?")) return;

    setDeletingId(id);
    try {
      const success = await deleteRoom(id);
      if (success) {
        alert("Room berhasil dihapus");
        onRefresh?.();
      } else {
        alert("Gagal menghapus room");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan");
    } finally {
      setDeletingId(null);
    }
  };

  /* ===================== RENDER ===================== */
  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Data Room</h2>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
          + New Room
        </button>
      </div>

      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-3 py-2">Room</th>
            <th className="border px-3 py-2">Hotel</th>
            <th className="border px-3 py-2">Type</th>
            <th className="border px-3 py-2">Price</th>
            <th className="border px-3 py-2">Status</th>
            <th className="border px-3 py-2 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {safeRooms.length > 0 ? (
            safeRooms.map((room) => {
              const { label, color } = getStatusLabel(room.status);

              return (
                <tr key={room.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2 font-medium">
                    {room.room_number}
                  </td>
                  <td className="border px-3 py-2">{room.nama_hotel}</td>
                  <td className="border px-3 py-2">
                    {room.room_type?.name ?? "-"}
                  </td>
                  <td className="border px-3 py-2">
                    {room.price_per_night
                      ? `Rp ${room.price_per_night.toLocaleString("id-ID")}`
                      : "-"}
                  </td>
                  <td className={`border px-3 py-2 font-medium ${color}`}>
                    {label}
                  </td>
                  <td className="border px-3 py-2 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(room)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(room.id)}
                      disabled={deletingId === room.id}
                      className={`px-3 py-1 text-xs text-white rounded-md ${deletingId === room.id
                        ? "bg-gray-400"
                        : "bg-red-600 hover:bg-red-700"
                        }`}>
                      {deletingId === room.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={6}
                className="border px-3 py-4 text-center text-gray-500">
                Tidak ada data room
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* MODAL */}
      {modalOpen && (
        <RoomModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={selectedRoom}
          loading={saving}
        />
      )}
    </div>
  );
}
