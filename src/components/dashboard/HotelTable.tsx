"use client";

import { useState } from "react";
import HotelModal from "../modal/ModalFormHotels";
import { Hotel } from "@/types/Hotel";

import { addHotel } from "@/app/functions/hotel/addHotel";
import { updateHotel } from "@/app/functions/hotel/updateHotel";
import { deleteHotel } from "@/app/functions/hotel/deleteHotel";

interface HotelTableProps {
  hotels: Hotel[];
  onRefresh?: () => void;
}

export default function HotelTable({ hotels, onRefresh }: HotelTableProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const safeHotels = Array.isArray(hotels) ? hotels : [];

  console.table(
    safeHotels.map((h) => ({
      id: h.id,
      nama: h.nama_hotel,
    }))
  );

  const handleCreate = () => {
    setSelectedHotel(null);
    setModalOpen(true);
  };

  const handleEdit = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setModalOpen(true);
  };

  const handleSubmit = async (hotelData: Hotel) => {
    setSaving(true);

    try {
      if (selectedHotel) {
        // UPDATE
        await updateHotel(selectedHotel.id, hotelData);
        alert("Hotel berhasil diperbarui");
      } else {
        // CREATE
        await addHotel(hotelData);
        alert("Hotel berhasil ditambahkan");
      }

      setModalOpen(false);
      setSelectedHotel(null);
      onRefresh?.();
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan data hotel");
    } finally {
      setSaving(false);
    }
  };

  /* ======================
     DELETE
  ====================== */
  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus hotel ini?")) return;

    setDeletingId(id);

    try {
      const success = await deleteHotel(id);
      if (success) {
        alert("Hotel berhasil dihapus");
        onRefresh?.();
      } else {
        alert("Gagal menghapus hotel");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menghapus");
    } finally {
      setDeletingId(null);
    }
  };

  /* ======================
     RENDER
  ====================== */
  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold mb-4">Informasi Hotel</h2>

        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-green-600 text-white rounded-md text-sm mb-4 hover:bg-green-700 transition">
          + New Hotel
        </button>
      </div>

      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-3 py-2 text-left">Nama Hotel</th>
            <th className="border px-3 py-2 text-left">Cabang</th>
            <th className="border px-3 py-2 text-left">Alamat</th>
            <th className="border px-3 py-2 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {safeHotels.length > 0 ? (
            safeHotels.map((hotel) => (
              <tr
                key={hotel.id}
                className="hover:bg-[var(--primary)] hover:text-[var(--foreground)] transition">
                <td className="border px-3 py-2 font-medium">
                  {hotel.nama_hotel}
                </td>
                <td className="border px-3 py-2">{hotel.cabang_hotel}</td>
                <td className="border px-3 py-2">{hotel.alamat_hotel}</td>

                <td className="border px-3 py-2 flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(hotel)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs">
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(hotel.id)}
                    disabled={deletingId === hotel.id}
                    className={`px-3 py-1 rounded-md text-xs text-white ${
                      deletingId === hotel.id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }`}>
                    {deletingId === hotel.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="border px-3 py-2 text-center text-gray-500">
                No hotels found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* MODAL */}
      {modalOpen && (
        <HotelModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={selectedHotel}
          loading={saving}
        />
      )}
    </div>
  );
}
