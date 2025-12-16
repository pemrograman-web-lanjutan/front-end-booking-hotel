"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface BookingFormUIProps {
  open: boolean;
  onClose: () => void;
  roomId?: number;
}

interface BookingData {
  nama_lengkap: string;
  email: string;
  no_hp: string;
  jenis_kelamin: string;
  checkin: string;
  checkout: string;
  room_id: number;
}

export default function BookingForm({ open, onClose, roomId }: BookingFormUIProps) {
  const router = useRouter();
  const [form, setForm] = useState<BookingData>({
    nama_lengkap: "",
    email: "",
    no_hp: "",
    jenis_kelamin: "",
    checkin: "",
    checkout: "",
    room_id: roomId || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!localStorage.getItem("token")) {
      localStorage.setItem("pendingBooking", JSON.stringify(form));
      router.push("/auth/login");
      toast.error("Silakan login terlebih dahulu untuk melakukan booking.");
      return;
    }

    // Submit booking
    try {
      const response = await fetch('http://localhost:8000/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Booking berhasil!");
        onClose();
      } else {
        alert("Booking gagal!");
      }
    } catch (error) {
      alert("Error: " + error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Form Booking
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Nama Lengkap */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="nama_lengkap"
              value={form.nama_lengkap}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              className="border p-2 rounded-lg w-full mt-1 placeholder:text-gray-900"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Masukkan email"
              className="border p-2 rounded-lg w-full mt-1"
              required
            />
          </div>

          {/* Nomor HP */}
          <div>
            <label className="text-sm font-medium text-gray-700">No. HP</label>
            <input
              type="tel"
              name="no_hp"
              value={form.no_hp}
              onChange={handleChange}
              placeholder="Masukkan nomor HP"
              className="border p-2 rounded-lg w-full mt-1"
              required
            />
          </div>

          {/* Jenis Kelamin */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Jenis Kelamin
            </label>
            <select
              name="jenis_kelamin"
              value={form.jenis_kelamin}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full mt-1 bg-white"
              required
            >
              <option value="">Pilih jenis kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          {/* Check-in */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Check-in
            </label>
            <input
              type="date"
              name="checkin"
              value={form.checkin}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full mt-1"
              required
            />
          </div>

          {/* Check-out */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Check-out
            </label>
            <input
              type="date"
              name="checkout"
              value={form.checkout}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full mt-1"
              required
            />
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="bg-[var(--primary)] text-white py-2 rounded-lg hover:bg-red-800 mt-2"
          >
            Kirim Booking
          </button>
        </form>
      </div>
    </div>
  );
}
