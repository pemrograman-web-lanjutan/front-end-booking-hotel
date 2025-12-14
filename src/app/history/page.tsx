"use client";

import { useEffect, useState } from "react";
import { Calendar, Hotel, MapPin } from "lucide-react";

export default function HistoryBookingPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch("http://localhost:8000/api/booking/history", {
          credentials: "include",
        });

        const json = await res.json();
        setHistory(Array.isArray(json.data) ? json.data : []);
      } catch (error) {
        console.error(error);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  return (
    <section className="px-6 py-12 md:px-12 min-h-screen bg-gray-100">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Histori Booking Anda
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Memuat histori booking...</p>
      ) : history.length === 0 ? (
        <p className="text-center text-gray-600">
          Anda belum memiliki histori booking.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow p-5 border border-gray-200">
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <Hotel className="w-5 h-5 mr-2" />
                {item.nama_hotel}
              </h2>

              <div className="text-sm text-gray-700 space-y-2">
                <p className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {item.lokasi}
                </p>

                <p className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Check-in: {item.check_in}
                </p>

                <p className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Check-out: {item.check_out}
                </p>

                <p className="mt-3 font-medium">
                  Total Pembayaran: Rp {item.total.toLocaleString("id-ID")}
                </p>

                <p
                  className={`mt-2 inline-block px-3 py-1 rounded text-white text-xs font-semibold
                    ${
                      item.status === "selesai"
                        ? "bg-green-600"
                        : item.status === "dibatalkan"
                        ? "bg-red-600"
                        : "bg-blue-600"
                    }
                  `}>
                  {item.status.toUpperCase()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
