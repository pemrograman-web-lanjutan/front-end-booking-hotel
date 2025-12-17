"use client";

import { useEffect, useState } from "react";
import { Hotel } from "../../types/Hotel";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (hotel: Hotel) => Promise<void> | void;
  initialData: Hotel | null;
  loading?: boolean;
}

export default function HotelModal({
  open,
  onClose,
  onSubmit,
  initialData,
  loading = false,
}: Props) {
  const [form, setForm] = useState<Hotel>({
    id: 0,
    nama_hotel: "",
    alamat_hotel: "",
    cabang_hotel: "",
    lat: 0,
    lng: 0,
  });

  /* ======================
     INIT FORM (CREATE / EDIT)
  ====================== */
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        id: 0,
        nama_hotel: "",
        alamat_hotel: "",
        cabang_hotel: "",
        lat: 0,
        lng: 0,
      });
    }
  }, [initialData, open]);

  /* ======================
     HANDLE CHANGE
  ====================== */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "lat" || name === "lng" ? Number(value) : value,
    }));
  };

  /* ======================
     SUBMIT
  ====================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("=== HOTEL SUBMIT ===");
    console.log("Mode:", initialData ? "UPDATE" : "CREATE");
    console.log("Payload:", form);

    await onSubmit(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-xl p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black">
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          {initialData ? "Update Hotel" : "Create Hotel"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Hotel */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama Hotel
            </label>
            <input
              name="nama_hotel"
              value={form.nama_hotel}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg mt-1"
              required
            />
          </div>

          {/* Cabang */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cabang Hotel
            </label>
            <input
              name="cabang_hotel"
              value={form.cabang_hotel}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg mt-1"
              required
            />
          </div>

          {/* Alamat */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Alamat Hotel
            </label>
            <input
              name="alamat_hotel"
              value={form.alamat_hotel}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg mt-1"
              required
            />
          </div>

          {/* Latitude */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              name="lat"
              value={form.lat}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg mt-1"
              required
            />
          </div>

          {/* Longitude */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Longitude
            </label>
            <input
              type="number"
              step="any"
              name="lng"
              value={form.lng}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg mt-1"
              required
            />
          </div>

          {/* ACTION */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg">
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-lg text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}>
              {loading ? "Saving..." : initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
