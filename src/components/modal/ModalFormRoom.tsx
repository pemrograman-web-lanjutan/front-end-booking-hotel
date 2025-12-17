"use client";

import { useEffect, useState } from "react";
import { RoomDetail } from "@/types/Room";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: RoomDetail) => void | Promise<void>;
  initialData?: RoomDetail | null;
  loading?: boolean;
}

export default function ModalFormRoom({
  open,
  onClose,
  onSubmit,
  initialData,
  loading,
}: Props) {
  const [form, setForm] = useState<RoomDetail>({
    id: 0,
    id_rooms_type: 0,
    id_hotel: 0,
    room_number: "",
    nama_hotel: "",
    status: "available",
    price_per_night: 0,
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price_per_night" ||
        name === "id_hotel" ||
        name === "id_rooms_type"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Room" : "Tambah Room"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="room_number"
            value={form.room_number}
            onChange={handleChange}
            placeholder="Room Number"
            className="w-full border px-3 py-2 rounded-md"
            required
          />

          <input
            name="id_hotel"
            type="number"
            value={form.id_hotel}
            onChange={handleChange}
            placeholder="Hotel ID"
            className="w-full border px-3 py-2 rounded-md"
            required
          />

          <input
            name="id_rooms_type"
            type="number"
            value={form.id_rooms_type}
            onChange={handleChange}
            placeholder="Room Type ID"
            className="w-full border px-3 py-2 rounded-md"
            required
          />

          <input
            name="price_per_night"
            type="number"
            value={form.price_per_night ?? 0}
            onChange={handleChange}
            placeholder="Harga per malam"
            className="w-full border px-3 py-2 rounded-md"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md">
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
          </select>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-md text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
