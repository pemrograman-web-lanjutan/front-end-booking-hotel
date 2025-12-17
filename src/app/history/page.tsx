"use client";

import { useEffect, useState } from "react";
import { X, Calendar, Hotel } from "lucide-react";
import Navbar from "@/components/Navbar";

interface BookingHistory {
  hotel_id: number;
  nama_hotel: string;
  check_in: string;
  check_out: string;
  total_amount: number;
  booking_status: "pending" | "confirmed" | "cancelled" | "completed";
}

export default function HistoryBookingPage() {
  const [history, setHistory] = useState<BookingHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<BookingHistory | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBookings() {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:8000/api/user/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const result = await res.json();

        if (res.ok && Array.isArray(result.data)) {
          const mapped: BookingHistory[] = result.data.map((b: any) => ({
            hotel_id: b.room?.hotel?.id,
            nama_hotel: b.room?.hotel?.nama_hotel ?? "-",
            check_in: b.check_in,
            check_out: b.check_out,
            total_amount: b.total_amount,
            booking_status: b.booking_status,
          }));

          setHistory(mapped);
        } else {
          setError(result.message || "Gagal memuat histori booking");
        }
      } catch {
        setError("Terjadi kesalahan saat memuat data");
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  const statusLabel = (status: string) => {
    if (status === "completed") return "SELESAI";
    if (status === "cancelled") return "DIBATALKAN";
    if (status === "confirmed") return "DIKONFIRMASI";
    return "DIPROSES";
  };

  const statusColor = (status: string) =>
    status === "completed"
      ? "bg-green-600"
      : status === "cancelled"
      ? "bg-red-600"
      : status === "confirmed"
      ? "bg-blue-600"
      : "bg-yellow-500";

  return (
    <section className="min-h-screen bg-[var(--third)]">
      <Navbar />
      <div className="py-8 px-10">
        <h1 className="text-xl md:text-3xl font-bold text-center mb-6 text-[var(--primary)]">
          Histori Booking
        </h1>

        {loading && (
          <p className="text-center text-gray-600">Memuat histori booking...</p>
        )}

        {error && (
          <p className="text-center text-red-600 font-medium">{error}</p>
        )}

        {!loading && history.length === 0 && (
          <p className="text-center text-gray-600">
            Anda belum memiliki histori booking.
          </p>
        )}

        {!loading && history.length > 0 && (
          <>
            <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--primary)] text-white">
                    <th className="px-4 py-3 text-left">Hotel</th>
                    <th className="px-4 py-3 text-left">Check-in</th>
                    <th className="px-4 py-3 text-left">Check-out</th>
                    <th className="px-4 py-3 text-left">Total</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item) => (
                    <tr
                      key={item.hotel_id}
                      onClick={() => setSelected(item)}
                      className="border-b hover:bg-gray-100 cursor-pointer">
                      <td className="px-4 py-3 font-medium">
                        {item.nama_hotel}
                      </td>
                      <td className="px-4 py-3">{item.check_in}</td>
                      <td className="px-4 py-3">{item.check_out}</td>
                      <td className="px-4 py-3 font-semibold text-[var(--primary)]">
                        Rp {item.total_amount.toLocaleString("id-ID")}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs text-white ${statusColor(
                            item.booking_status
                          )}`}>
                          {statusLabel(item.booking_status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4">
              {history.map((item) => (
                <div
                  key={item.hotel_id}
                  onClick={() => setSelected(item)}
                  className="bg-white rounded-xl shadow p-4 border cursor-pointer">
                  <div className="flex justify-between items-start">
                    <h2 className="font-semibold text-[var(--primary)] flex items-center">
                      <Hotel className="w-4 h-4 mr-2" />
                      {item.nama_hotel}
                    </h2>

                    <span
                      className={`px-2 py-1 rounded text-xs text-white ${statusColor(
                        item.booking_status
                      )}`}>
                      {statusLabel(item.booking_status)}
                    </span>
                  </div>

                  <div className="text-sm text-gray-700 mt-2 space-y-1">
                    <p className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {item.check_in} → {item.check_out}
                    </p>

                    <p className="font-semibold text-[var(--primary)] mt-2">
                      Rp {item.total_amount.toLocaleString("id-ID")}
                    </p>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    Ketuk untuk lihat detail
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {selected && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm relative mx-4">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-gray-500">
                <X />
              </button>

              <h2 className="text-lg font-bold mb-4 text-[var(--primary)]">
                Detail Booking
              </h2>

              <div className="space-y-2 text-sm">
                <p>
                  <strong>Hotel:</strong> {selected.nama_hotel}
                </p>
                <p>
                  <strong>Check-in:</strong> {selected.check_in}
                </p>
                <p>
                  <strong>Check-out:</strong> {selected.check_out}
                </p>
                <p>
                  <strong>Total:</strong> Rp{" "}
                  {selected.total_amount.toLocaleString("id-ID")}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {statusLabel(selected.booking_status)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
