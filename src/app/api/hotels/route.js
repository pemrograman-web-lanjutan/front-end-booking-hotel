"use client";
import { useEffect, useState } from "react";

export default function HotelList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/index")
      .then((res) => res.json())
      .then((result) => setData(result.data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Daftar Hotel & Room</h2>
      <ul className="space-y-2">
        {data.map((item, index) => (
          <li key={index} className="border p-3 rounded-lg shadow">
            <p>
              🏨 <b>{item.nama_hotel}</b>
            </p>
            <p>🛏️ Tipe Kamar: {item.room_type_name}</p>
            <p>🔢 Nomor Kamar: {item.room_number}</p>
            <p>🍽️ Opsi: {item.room_options ?? "Tidak ada data"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
