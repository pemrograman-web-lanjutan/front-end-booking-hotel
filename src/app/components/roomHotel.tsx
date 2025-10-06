"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { RoomsHotels } from "../data/cabang";

export default function RoomHotel() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city") ?? "";

  const hotel = RoomsHotels.find(
    (h) => h.city.toLowerCase() === city.toLowerCase()
  );

  if (!hotel) return <p>Hotel tidak ditemukan.</p>;
  return (
    <section className="bg-white text-black py-16 px-6 md:px-8">
      <h2 className="text-3xl font-bold text-center mb-10">{hotel.branch}</h2>

      <div className="flex justify-center items-center gap-10 mb-10">
        {hotel.galeryRooms.map((img, i) => (
          <Image
            key={i}
            src={img.src}
            alt={`Room ${hotel.branch} ${i + 1}`}
            width={280}
            height={200}
            className={`object-cover shadow ${
              i === 1 ? "rounded-lg shadow-2xl" : ""
            }`}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-start text-sm leading-relaxed">
        <p className="mb-4">{hotel.description}</p>
        <p className="font-semibold">{hotel.address}</p>
      </div>
    </section>
  );
}
