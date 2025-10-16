"use client";
import { useEffect, useState } from "react";
import {ulasan} from "./UlasanType";
export default function UlasanList() {
  const [data, setData] = useState<ulasan[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/ulasan/")
      .then((res) => res.json())
      .then((result) => setData(result.data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Ulasan</h2>
      <ul className="space-y-2">
        {data.map((item, index) => (
          <li key={index} className="border p-3 rounded-lg shadow">
            <p>
              🏨 <b>{item.nama_hotel}</b>
            </p>
            <p>👤 Pengulas: {item.user_name}</p>
            <p>⭐ Rating: {item.rate_value.toString()}</p>
            <p>📝 Judul: {item.judul_review}</p>
            <p>📜 Deskripsi: {item.deskripsi_review}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
