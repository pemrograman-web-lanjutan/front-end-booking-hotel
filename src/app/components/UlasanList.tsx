"use client";

import { useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { reviews } from "../data/ulasan";

function daysAgo(date: string) {
  const today = new Date();
  const reviewDate = new Date(date);
  const diffTime = today.getTime() - reviewDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 0 ? "Hari ini" : `${diffDays} hari lalu`;
}

type Props = {
  city: string; // ganti dari hotelId jadi city
};

export default function UlasanList({ city }: Props) {
  const [page, setPage] = useState(1);
  const perPage = 5;

  // filter ulasan sesuai city
  const filtered = reviews.filter((r) => r.city === city);

  // paginasi
  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  return (
    <section className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Ulasan Pelanggan</h2>

      {filtered.length === 0 ? (
        <p className="text-gray-500">Belum ada ulasan untuk hotel di {city}.</p>
      ) : (
        paginated.map((ulasan) => (
          <div
            key={ulasan.id}
            className="p-4 rounded-2xl shadow-sm flex space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={ulasan.avatar}
                alt={ulasan.name}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{ulasan.name}</h3>
                <span className="text-sm text-gray-500">
                  Diulas {daysAgo(ulasan.date)}
                </span>
              </div>

              <div className="flex items-center mt-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={`h-5 w-5 ${
                      i < ulasan.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <p className="mt-2 text-gray-700">{ulasan.text}</p>
            </div>
          </div>
        ))
      )}

      {filtered.length > 0 && (
        <div className="flex justify-center space-x-2 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50">
            Prev
          </button>
          <span>
            Halaman {page} dari {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50">
            Next
          </button>
        </div>
      )}
    </section>
  );
}
