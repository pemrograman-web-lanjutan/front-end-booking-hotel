"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function UlasanList({ id }: { id: string }) {
  const [reviews, setReviews] = useState<any[]>([]);
  console.log("hotel id:", id);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(
          `http://localhost:8000/api/hotel/${id}/reviews`
        );

        const result = await res.json();

        // Pastikan selalu array
        const list = Array.isArray(result.data) ? result.data : [];

        setReviews(list);
      } catch (err) {
        console.log("Error fetch review:", err);
      }
    }

    fetchReviews();
  }, [id]);

  return (
    <section className="p-6 space-y-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">Ulasan Pelanggan</h2>

      {reviews.length === 0 && (
        <p className="text-gray-500">Belum ada ulasan untuk hotel ini.</p>
      )}

      {reviews.map((rev) => (
        <div
          key={rev.review_id}
          className="p-5 rounded-2xl border shadow-sm bg-white flex gap-4">
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <Image src="/user.png" alt="User Avatar" width={64} height={64} />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-lg">{rev.user_name}</h3>

            <div className="flex items-center space-x-1 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < rev.rating_review ? "text-yellow-400" : "text-gray-300"
                  }
                />
              ))}
            </div>

            <p className="mt-2 text-gray-700">{rev.deskripsi_review}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
