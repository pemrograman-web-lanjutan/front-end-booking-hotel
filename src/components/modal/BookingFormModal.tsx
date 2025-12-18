"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface BookingFormUIProps {
  open: boolean;
  onClose: () => void;
  room?: {
    id: number;
    room_type_name: string;
    price_per_night: number;
    room_number: string;
  } | null;
}

interface BookingData {
  user_id: number;
  room_id: number;
  check_in: string;
  check_out: string;
  total_nights: number;
  total_amount: number;
  booking_status: string;
  payment_status: string;
  booking_date: string;
}

export default function BookingForm({
  open,
  onClose,
  room,
}: BookingFormUIProps) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  const [form, setForm] = useState<BookingData>({
    user_id: 0,
    room_id: 0,
    check_in: "",
    check_out: "",
    total_nights: 1,
    total_amount: 0,
    booking_status: "pending",
    payment_status: "pending",
    booking_date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    // Get user from local storage
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const userData = JSON.parse(userStr);
      setUser(userData);
      setForm(prev => ({ ...prev, user_id: userData.id }));
    }
  }, []);

  useEffect(() => {
    if (room) {
      setForm(prev => ({
        ...prev,
        room_id: room.id,
        total_amount: room.price_per_night * prev.total_nights
      }));
    }
  }, [room]);

  // Auto-calculate checkout and total amount
  useEffect(() => {
    if (form.check_in && form.total_nights > 0 && room) {
      const checkInDate = new Date(form.check_in);
      const checkOutDate = new Date(checkInDate);
      checkOutDate.setDate(checkOutDate.getDate() + form.total_nights);

      const yyyy = checkOutDate.getFullYear();
      const mm = String(checkOutDate.getMonth() + 1).padStart(2, '0');
      const dd = String(checkOutDate.getDate()).padStart(2, '0');

      setForm(prev => ({
        ...prev,
        check_out: `${yyyy}-${mm}-${dd}`,
        total_amount: room.price_per_night * form.total_nights
      }));
    }
  }, [form.check_in, form.total_nights, room]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'total_nights' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !localStorage.getItem("token")) {
      router.push("/auth/login");
      toast.error("Silakan login terlebih dahulu untuk melakukan booking.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success("Booking berhasil!");
        onClose();
      } else {
        toast.error(responseData.message || "Booking gagal!");
        console.error("Booking Error:", responseData);
      }
    } catch (error: any) {
      toast.error("Error: " + error.message);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black">
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Form Booking</h2>

        <div className="mb-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
          <p><strong>Tamu:</strong> {user?.name || "Guest"}</p>
          <p><strong>Kamar:</strong> {room?.room_number} - {room?.room_type_name}</p>
          <p><strong>Harga:</strong> Rp {room?.price_per_night?.toLocaleString('id-ID')} / malam</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Check-in */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Tanggal Check-in
            </label>
            <input
              type="date"
              name="check_in"
              value={form.check_in}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full mt-1"
              required
            />
          </div>

          {/* Durasi */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Durasi (Malam)
            </label>
            <input
              type="number"
              name="total_nights"
              value={form.total_nights}
              onChange={handleChange}
              min="1"
              max="4"
              className="border p-2 rounded-lg w-full mt-1"
              required
            />
          </div>

          {/* Check-out */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Tanggal Check-out (Otomatis)
            </label>
            <input
              type="date"
              name="check_out"
              value={form.check_out}
              className="border p-2 rounded-lg w-full mt-1 bg-gray-100"
              readOnly
            />
          </div>

          {/* Summary */}
          <div className="flex justify-between items-center py-2 border-t mt-2">
            <span className="font-semibold text-gray-700">Total Biaya:</span>
            <span className="font-bold text-xl text-blue-600">
              Rp {form.total_amount.toLocaleString('id-ID')}
            </span>
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="bg-[var(--primary)] text-white py-2 rounded-lg hover:bg-red-800 mt-2 transition-colors">
            Konfirmasi Booking
          </button>
        </form>
      </div>
    </div>
  );
}
