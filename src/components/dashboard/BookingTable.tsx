"use client";

import { useState } from "react";

export default function BookingTable() {
  const [bookings, setBookings] = useState([
    {
      id_booking: "B001",
      nama_customer: "John Doe",
      room: "Deluxe 101",
      checkin: "2025-09-21",
      checkout: "2025-09-25",
      status: "Confirmed",
    },
    {
      id_booking: "B002",
      nama_customer: "Jane Smith",
      room: "Suite 202",
      checkin: "2025-09-22",
      checkout: "2025-09-24",
      status: "Pending",
    },
  ]);

  const deleteBooking = (id: string) => {
    setBookings(bookings.filter((b) => b.id_booking !== id));
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-lg font-semibold mb-4">Recent Booking</h2>
      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2 text-left">ID Booking</th>
            <th className="border px-3 py-2 text-left">Customer</th>
            <th className="border px-3 py-2 text-left">Room</th>
            <th className="border px-3 py-2 text-left">Check-in</th>
            <th className="border px-3 py-2 text-left">Check-out</th>
            <th className="border px-3 py-2 text-left">Status</th>
            <th className="border px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id_booking} className="hover:bg-gray-50">
              <td className="border px-3 py-2">{booking.id_booking}</td>
              <td className="border px-3 py-2">{booking.nama_customer}</td>
              <td className="border px-3 py-2">{booking.room}</td>
              <td className="border px-3 py-2">{booking.checkin}</td>
              <td className="border px-3 py-2">{booking.checkout}</td>
              <td className="border px-3 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    booking.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : booking.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                  {booking.status}
                </span>
              </td>
              <td className="border px-3 py-2">
                <button
                  onClick={() => deleteBooking(booking.id_booking)}
                  className="px-3 py-1 bg-red-600 text-white rounded-md text-xs">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
