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
  return (
    <section className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Ulasan Pelanggan</h2>

      <p className="text-gray-500">Belum ada ulasan untuk hotel di kota?.</p>
      <div className="p-4 rounded-2xl shadow-sm flex space-x-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={"/user.png"}
            alt={"User Avatar"}
            width={48}
            height={48}
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Wisnu Pradnya Yoga</h3>
            <span className="text-sm text-gray-500">
              Diulas tanggal berapa?
            </span>
          </div>

          <div className="flex items-center mt-1">
            <FaStar className="h-5 w-5text-yellow-400" />
          </div>

          <p className="mt-2 text-gray-700">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, ab!
          </p>
        </div>
      </div>

      <div className="flex justify-center space-x-2 mt-4">
        <button className="px-3 py-1 border rounded disabled:opacity-50">
          Prev
        </button>
        <span>Halaman 1 dari 4</span>
        <button className="px-3 py-1 border rounded disabled:opacity-50">
          Next
        </button>
      </div>
    </section>
  );
}
