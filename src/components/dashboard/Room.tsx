"use client";

import { useState, useEffect } from "react";
import RoomModal from "../modal/ModalFormRoom";
import { RoomType } from "@/types/Room_type";

// API tetap ROOM, tapi TYPE = RoomType
import { addRoom } from "@/app/functions/room/addRoom";
import { updateRoom } from "@/app/functions/room/updateRoom";
import { deleteRoom } from "@/app/functions/room/deleteRoom";

interface Props {
  roomTypes: RoomType[];
  onRefresh?: () => void;
}

export default function RoomTypeTable({ roomTypes, onRefresh }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<RoomType | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const safeRoomTypes = Array.isArray(roomTypes) ? roomTypes : [];

  /* ===================== CREATE ===================== */
  const handleCreate = () => {
    setSelected(null);
    setModalOpen(true);
  };

  /* ===================== EDIT ===================== */
  const handleEdit = (data: RoomType) => {
    setSelected(data);
    setModalOpen(true);
  };

  /* ===================== SUBMIT ===================== */
  const handleSubmit = async (data: RoomType) => {
    setSaving(true);
    try {
      if (selected) {
        await updateRoom(selected.id, data);
        alert("Room type berhasil diperbarui");
      } else {
        await addRoom(data);
        alert("Room type berhasil ditambahkan");
      }

      setModalOpen(false);
      setSelected(null);
      onRefresh?.();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan room type");
    } finally {
      setSaving(false);
    }
  };

  /* ===================== DELETE ===================== */
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus room type ini?")) return;

    setDeletingId(id);
    try {
      await deleteRoom(id);
      alert("Room type berhasil dihapus");
      onRefresh?.();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus room type");
    } finally {
      setDeletingId(null);
    }
  };

  /* ===================== RENDER ===================== */
  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Room Type</h2>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
          + New Room Type
        </button>
      </div>

      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-3 py-2">Name</th>
            <th className="border px-3 py-2">Bed Type</th>
            <th className="border px-3 py-2">Max Occupancy</th>
            <th className="border px-3 py-2">Price / Night</th>
            <th className="border px-3 py-2 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {safeRoomTypes.length > 0 ? (
            safeRoomTypes.map((rt) => (
              <tr key={rt.id} className="hover:bg-gray-50">
                <td className="border px-3 py-2 font-medium">{rt.name}</td>
                <td className="border px-3 py-2 capitalize">{rt.bed_type}</td>
                <td className="border px-3 py-2 text-center">
                  {rt.max_occupancy}
                </td>
                <td className="border px-3 py-2">
                  {typeof rt.price_per_night === "number"
                    ? `Rp ${rt.price_per_night.toLocaleString("id-ID")}`
                    : "-"}
                </td>
                <td className="border px-3 py-2 flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(rt)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs">
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(rt.id)}
                    disabled={deletingId === rt.id}
                    className={`px-3 py-1 text-xs text-white rounded-md ${
                      deletingId === rt.id
                        ? "bg-gray-400"
                        : "bg-red-600 hover:bg-red-700"
                    }`}>
                    {deletingId === rt.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="border px-3 py-4 text-center text-gray-500">
                Tidak ada data room type
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {modalOpen && (
        <RoomModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={selected}
          loading={saving}
        />
      )}
    </div>
  );
}
