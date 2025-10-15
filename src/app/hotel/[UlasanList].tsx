"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";

function daysAgo(date: string) {
  const today = new Date();
  const reviewDate = new Date(date);
  const diffTime = today.getTime() - reviewDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 0 ? "Hari ini" : `${diffDays} hari lalu`;
}

export default function UlasanList() {
  const rating = 4; // contoh rating
  const reviewDate = "2025-10-14"; // contoh tanggal

  return (
    <section className="p-4 sm:p-6 space-y-4 max-w-3xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
        Ulasan Pelanggan
      </h2>

      {/* Jika belum ada ulasan */}
      <p className="text-gray-500 text-sm sm:text-base">
        Belum ada ulasan untuk hotel di kota ini.
      </p>

      {/* Card ulasan */}
      <div className="p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-start sm:space-x-4 bg-white">
        {/* Foto pengguna */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0 mx-auto sm:mx-0 mb-3 sm:mb-0">
          <Image
            src="/user.png"
            alt="User Avatar"
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Konten ulasan */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
              Wisnu Pradnya Yoga
            </h3>
            <span className="text-xs sm:text-sm text-gray-500">
              {daysAgo(reviewDate)}
            </span>
          </div>

          {/* Rating */}
          <div className="flex justify-center sm:justify-start items-center mt-2 space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={`h-5 w-5 ${
                  i < rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Isi ulasan */}
          <p className="mt-3 text-gray-700 text-sm sm:text-base leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            deleniti, totam quisquam dolore fuga nihil.
          </p>
        </div>
      </div>

      {/* Navigasi halaman */}
      <div className="flex flex-col sm:flex-row justify-center sm:items-center sm:space-x-3 text-sm sm:text-base mt-4 space-y-2 sm:space-y-0">
        <button className="px-4 py-1.5 border rounded-lg bg-gray-50 hover:bg-gray-100 transition disabled:opacity-50">
          Prev
        </button>
        <span className="text-gray-600">Halaman 1 dari 4</span>
        <button className="px-4 py-1.5 border rounded-lg bg-gray-50 hover:bg-gray-100 transition disabled:opacity-50">
          Next
        </button>
      </div>
    </section>
  );
}
