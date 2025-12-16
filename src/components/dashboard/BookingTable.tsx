"use client";

import { useState } from "react";
import BookingModal from "../modal/ModalFormBooking";
import { Booking } from "@/types/booking";
import { deleteBooking } from "@/app/functions/deleteBooking";


interface BookingTableProps {
  bookings: Booking[];
  onRefresh?: () => void;
}

export default function BookingTable({ bookings, onRefresh }: BookingTableProps) {

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Ensure bookings is always an array
  const safeBookings = Array.isArray(bookings) ? bookings : [];

  const handleCreate = () => {
    setSelectedBooking(null);
    setModalOpen(true);
  };

  const handleEdit = (booking: any) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  // submit hasil update/create dari modal
  const handleUpdate = (updated: any) => {
    console.log("Booking saved:", updated);
    // Refresh data setelah create/update
    if (onRefresh) {
      onRefresh();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus booking ini?")) {
      return;
    }

    setDeletingId(id);

    try {
      const success = await deleteBooking(id);
      if (success) {
        alert("Booking berhasil dihapus!");
        // Refresh data setelah delete
        if (onRefresh) {
          onRefresh();
        }
      } else {
        alert("Gagal menghapus booking. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Terjadi kesalahan saat menghapus.");
    } finally {
      setDeletingId(null);
    }
  };


  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold mb-4">Recent Booking</h2>

        <div className="plus-button ">
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-600 text-white rounded-md text-sm mb-4 hover:cursor-pointer hover:bg-green-700 transition">
            + New Booking
          </button>
        </div>
      </div>

      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2 text-left">ID Booking</th>
            <th className="border px-3 py-2 text-left">Room-ID</th>
            <th className="border px-3 py-2 text-left">User-ID</th>
            <th className="border px-3 py-2 text-left">Check-in</th>
            <th className="border px-3 py-2 text-left">Check-out</th>
            <th className="border px-3 py-2 text-left">Total Amount</th>
            <th className="border px-3 py-2 text-left">Total Nights</th>
            <th className="border px-3 py-2 text-left">Booking Status</th>
            <th className="border px-3 py-2 text-left">Payment Status</th>
            <th className="border px-3 py-2 text-left">Booking Date</th>
            <th className="border px-3 py-2 text-left">Cancellation Date</th>
            <th className="border px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {safeBookings.length > 0 ? (
            safeBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{booking.id}</td>
                <td className="border px-3 py-2">{booking.user_id}</td>
                <td className="border px-3 py-2">{booking.room_id}</td>
                <td className="border px-3 py-2">{booking.check_in}</td>
                <td className="border px-3 py-2">{booking.check_out}</td>
                <td className="border px-3 py-2">{booking.total_amount}</td>
                <td className="border px-3 py-2">{booking.total_nights}</td>
                <td className="border px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${booking.booking_status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : booking.booking_status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                      }`}>
                    {booking.booking_status}
                  </span>
                </td>

                <td className="border px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${booking.payment_status === "paid"
                      ? "bg-green-100 text-green-700"
                      : booking.payment_status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                      }`}>
                    {booking.payment_status}
                  </span>
                </td>

                <td className="border px-3 py-2">{booking.booking_date}</td>
                <td className="border px-3 py-2">{booking.cancellation_date || "-"}</td>


                <td className="border px-3 py-2 flex gap-2">
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(booking)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs">
                    Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(booking.id)}
                    disabled={deletingId === booking.id}
                    className={`px-3 py-1 rounded-md text-xs text-white ${deletingId === booking.id ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                      }`}
                  >
                    {deletingId === booking.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={11} className="border px-3 py-2 text-center text-gray-500">
                No bookings found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {modalOpen && (
        <BookingModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleUpdate}
          initialData={selectedBooking}
        />
      )}
    </div>
  );
}
