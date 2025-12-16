"use client";

import { useEffect, useState } from "react";
import { Booking } from "@/types/booking";
import { Users } from "@/types/User";
import { getUsers } from "@/app/functions/getUsers";
import { getRooms } from "@/app/functions/getRooms";
import { RoomDetail } from "@/types/Room";
import { addBooking } from "@/app/functions/addBooking";
import { updateBooking } from "@/app/functions/updateBooking";

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
    user_id: "",
    room_id: "",
    check_in: "",
    check_out: "",
    booking_status: "pending",
    total_amount: 0,
    payment_status: "pending",
    booking_date: "",
    total_nights: 1
  });

  const [users, setUsers] = useState<Users[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [rooms, setRooms] = useState<RoomDetail[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // isi form saat edit
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      // Reset form when opening for new booking
      setForm({
        id: "",
        user_id: "",
        room_id: "",
        check_in: "",
        check_out: "",
        booking_status: "pending",
        total_amount: 0,
        payment_status: "pending",
        booking_date: "",
        total_nights: 1
      });
    }
  }, [initialData, open]);

  // Auto-calculate checkout date based on check-in + total_nights
  useEffect(() => {
    if (form.check_in && form.total_nights > 0) {
      // Parse date string to avoid timezone issues
      const [year, month, day] = form.check_in.split('-').map(Number);
      const checkInDate = new Date(year, month - 1, day); // month is 0-indexed

      // Add total_nights to get checkout date
      const checkOutDate = new Date(checkInDate);
      checkOutDate.setDate(checkOutDate.getDate() + form.total_nights);

      // Format to YYYY-MM-DD
      const yyyy = checkOutDate.getFullYear();
      const mm = String(checkOutDate.getMonth() + 1).padStart(2, '0');
      const dd = String(checkOutDate.getDate()).padStart(2, '0');
      const formattedCheckOut = `${yyyy}-${mm}-${dd}`;

      // Calculate total amount
      let totalAmount = 0;
      if (form.room_id) {
        const selectedRoom = rooms.find(r => r.id.toString() === form.room_id.toString());
        if (selectedRoom && selectedRoom.price_per_night) {
          totalAmount = selectedRoom.price_per_night * form.total_nights;
        }
      }

      setForm((prev) => ({
        ...prev,
        check_out: formattedCheckOut,
        total_amount: totalAmount
      }));
    }
  }, [form.check_in, form.total_nights, form.room_id, rooms]);

  // fetch users sekali
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
      setLoadingUsers(false);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      const data = await getRooms();
      setRooms(data);
      setLoadingRooms(false);
    };

    fetchRooms();
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === 'total_nights' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (initialData) {
        // Update existing booking
        const result = await updateBooking(form.id, form);
        if (result) {
          alert("Booking berhasil diupdate!");
          onSubmit(result);
          onClose();
        } else {
          alert("Gagal update booking. Silakan coba lagi.");
        }
      } else {
        // Create new booking
        const { id, booking_date, cancellation_date, ...bookingData } = form;

        console.log("Adding booking with data:", bookingData); // Debug log

        const result = await addBooking(bookingData);
        if (result) {
          alert("Booking berhasil ditambahkan!");
          onSubmit(result);
          onClose();
        } else {
          alert("Gagal menambahkan booking. Silakan coba lagi.");
        }
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Booking" : "Add Booking"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Tamu */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Nama Tamu
            </label>
            <select
              name="user_id"
              value={form.user_id}
              onChange={handleChange}
              className="w-full border p-2 rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
            >
              <option value="" disabled>
                {loadingUsers ? "Loading..." : "--- Pilih Nama Tamu ---"}
              </option>

              {!loadingUsers &&
                users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Kamar
            </label>
            <select
              name="room_id"
              value={form.room_id}
              onChange={handleChange}
              className="w-full border p-2 rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
            >
              <option value="" disabled>
                {loadingRooms ? "Loading..." : "--- Pilih Kamar ---"}
              </option>

              {!loadingRooms &&
                rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.room_number} -- {room.nama_hotel}
                  </option>
                ))}
            </select>
          </div>

          {/* Check-in */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tanggal Check-in
            </label>
            <input
              type="date"
              name="check_in"
              value={form.check_in}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Check-out */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tanggal Check-out (Auto-calculated)
            </label>
            <input
              type="date"
              name="check_out"
              value={form.check_out}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
              disabled
              readOnly
            />
          </div>

          <div className="flex gap-4 items-center justify-between">

            <div className="w-full">
              <label className="block text-sm font-medium mb-1">
                Status Booking
              </label>
              <select
                name="booking_status"
                value={form.booking_status}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="pending" selected>Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Status Payment */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">
                Status Payment
              </label>
              <select
                name="payment_status"
                value={form.payment_status}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="pending" selected>Pending</option>
                <option value="paid">Paid</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>
          {/* Status Booking */}

          <div>
            <label htmlFor="" className="block text-sm font-medium mb-1">Total Nights</label>

            <input type="number" name="total_nights" value={form.total_nights} onChange={handleChange} className="w-full border p-2 rounded" min={1} max={4} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Total Amount (Auto-calculated)</label>
            <input
              type="text"
              value={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(form.total_amount)}
              className="w-full border p-2 rounded bg-gray-100"
              readOnly
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-blue-400 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Processing..."
                : initialData ? "Update Booking" : "Create Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
