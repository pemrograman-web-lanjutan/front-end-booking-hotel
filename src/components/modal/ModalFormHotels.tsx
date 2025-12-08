"use client";

import { useEffect, useState } from "react";
import { Hotel } from "../../types/Hotel";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (hotel: Hotel) => void;
  initialData: Hotel | null;
}

export default function HotelModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [form, setForm] = useState<Hotel>({
    id: 0,
    nama_hotel: "",
    alamat_hotel: "",
    cabang_hotel: "",
    lat: 0,
    lng: 0,
  });

  // Isi otomatis jika mode update
  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "lat" || name === "leng" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Update Hotel" : "Create Hotel"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">ID Hotel</label>
            <input
              name="id"
              value={form.id}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
              disabled={!!initialData}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Nama Hotel</label>
            <input
              name="nama_hotel"
              value={form.nama_hotel}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Cabang Hotel</label>
            <input
              name="cabang_hotel"
              value={form.cabang_hotel}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Alamat Hotel</label>
            <input
              name="alamat_hotel"
              value={form.alamat_hotel}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Latitude</label>
            <input
              type="number"
              name="lat"
              value={form.lat}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Longitude</label>
            <input
              type="number"
              name="leng"
              value={form.lng}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded">
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
