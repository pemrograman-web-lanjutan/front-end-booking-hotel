"use client";

import { useEffect, useState } from "react";
import { Booking } from "../../types/booking";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (booking: Booking) => void;
  initialData: Booking | null;
}

export default function BookingModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [form, setForm] = useState<Booking>({
    id: "",
    nama_tamu: "",
    room: "",
    checkin: "",
    checkout: "",
    status_booking: "pending",
  });

  // Isi otomatis saat update
  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
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
        <h2 className="text-xl font-semibold mb-4">Update Booking</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Tamu */}
          <div>
            <label className="block text-sm font-medium">Nama Tamu</label>
            <input
              name="nama_tamu"
              value={form.nama_tamu}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Tanggal Check-in */}
          <div>
            <label className="block text-sm font-medium">
              Tanggal Check-in
            </label>
            <input
              type="date"
              name="tanggal_checkin"
              value={form.checkin}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Tanggal Check-out */}
          <div>
            <label className="block text-sm font-medium">
              Tanggal Check-out
            </label>
            <input
              type="date"
              name="tanggal_checkout"
              value={form.checkout}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Status Booking */}
          <div>
            <label className="block text-sm font-medium">Status Booking</label>
            <select
              name="status_booking"
              value={form.status_booking}
              onChange={handleChange}
              className="w-full border p-2 rounded">
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Tombol */}
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
              Update Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
