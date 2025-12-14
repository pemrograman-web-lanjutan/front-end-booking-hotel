"use client";

import { useEffect, useState } from "react";
import { RoomsHotels } from "../data/cabang";

interface BookingFormUIProps {
  onClose: () => void;
}

export default function BookingForm({ onClose }: BookingFormUIProps) {
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
          Form Booking — [Nama Hotel] / [Nama Kamar]
        </h2>

        <form className="flex flex-col gap-4">
          {/* Nama Lengkap */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              className="border p-2 rounded-lg w-full mt-1"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Masukkan email"
              className="border p-2 rounded-lg w-full mt-1"
            />
          </div>

          {/* Nomor HP */}
          <div>
            <label className="text-sm font-medium text-gray-700">No. HP</label>
            <input
              type="tel"
              placeholder="Masukkan nomor HP"
              className="border p-2 rounded-lg w-full mt-1"
            />
          </div>

          {/* Jenis Kelamin */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Jenis Kelamin
            </label>
            <select className="border p-2 rounded-lg w-full mt-1 bg-white">
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
            <input type="date" className="border p-2 rounded-lg w-full mt-1" />
          </div>

          {/* Check-out */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Check-out
            </label>
            <input type="date" className="border p-2 rounded-lg w-full mt-1" />
          </div>

          {/* Tombol Submit */}
          <button
            type="button"
            className="bg-[var(--primary)] text-white py-2 rounded-lg hover:bg-red-800 mt-2"
          >
            Kirim Booking
          </button>
        </form>
      </div>
    </div>
  );
}
