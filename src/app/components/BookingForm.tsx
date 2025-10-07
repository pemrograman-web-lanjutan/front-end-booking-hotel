"use client";

import { useEffect, useState } from "react";
import { RoomsHotels } from "../data/cabang";

interface BookingFormProps {
  roomId: number;
  onClose: () => void;
}

export default function BookingForm({ roomId, onClose }: BookingFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    date: "",
  });

  const [roomInfo, setRoomInfo] = useState<{
    hotelName: string;
    roomName: string;
    status: string;
  } | null>(null);

  // Cari hotel & room berdasarkan roomId
  useEffect(() => {
    if (!roomId) return;

    let found = false;
    for (const hotel of RoomsHotels) {
      const room = hotel.rooms.find((r) => r.id === roomId);
      if (!room) continue;

      // Simpan status kamar juga
      if (hotel.status === "available") {
        setRoomInfo({
          hotelName: hotel.branch,
          roomName: room.name,
          status: room.status,
        });
        found = true;
        break;
      }
    }

    if (!found) setRoomInfo(null);
  }, [roomId]);

  const validate = () => {
    const newErrors = {
      fullName: "",
      email: "",
      phone: "",
      gender: "",
      date: "",
    };
    let isValid = true;

    if (!fullName.trim()) {
      newErrors.fullName = "Nama lengkap wajib diisi.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email wajib diisi.";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Format email tidak valid.";
      isValid = false;
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phone.trim()) {
      newErrors.phone = "Nomor HP wajib diisi.";
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "Nomor HP harus berupa angka, 10-15 digit.";
      isValid = false;
    }

    if (!gender) {
      newErrors.gender = "Jenis kelamin wajib dipilih.";
      isValid = false;
    }

    if (!checkIn || !checkOut) {
      newErrors.date = "Check-in dan Check-out wajib diisi.";
      isValid = false;
    } else if (new Date(checkOut) < new Date(checkIn)) {
      newErrors.date = "Check-out tidak boleh sebelum Check-in.";
      isValid = false;
    }

    // Validasi status kamar sebelum submit
    if (roomInfo?.status === "fully_booked") {
      alert("Maaf, kamar ini sudah penuh.");
      isValid = false;
    } else if (roomInfo?.status === "maintenance") {
      alert("Maaf, kamar ini sedang dalam perawatan.");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert(
        `Booking berhasil untuk ${roomInfo?.hotelName || "Hotel"} — ${
          roomInfo?.roomName || "Room"
        }!`
      );
      onClose();
    }
  };

  if (!roomInfo) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg relative text-center">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-black"
          >
            ✕
          </button>
          <p className="text-red-600 font-medium">
            Maaf, kamar tidak tersedia atau hotel sedang tidak available.
          </p>
        </div>
      </div>
    );
  }

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
          Form Booking — {roomInfo.hotelName} / {roomInfo.roomName}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Masukkan nama lengkap"
              className="border p-2 rounded-lg w-full mt-1"
            />
            {errors.fullName && (
              <p className="text-red-600 text-sm">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email"
              className="border p-2 rounded-lg w-full mt-1"
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">No. HP</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Masukkan nomor HP"
              className="border p-2 rounded-lg w-full mt-1"
            />
            {errors.phone && (
              <p className="text-red-600 text-sm">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Jenis Kelamin
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border p-2 rounded-lg w-full mt-1 bg-white"
            >
              <option value="">Pilih jenis kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
            {errors.gender && (
              <p className="text-red-600 text-sm">{errors.gender}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Check-in
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="border p-2 rounded-lg w-full mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Check-out
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="border p-2 rounded-lg w-full mt-1"
            />
            {errors.date && (
              <p className="text-red-600 text-sm">{errors.date}</p>
            )}
          </div>

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
