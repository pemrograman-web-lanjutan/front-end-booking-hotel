"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { RoomsHotels } from "../data/cabang";
import { useSearchParams } from "next/navigation";

export default function DetailHotel() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const city = searchParams.get("city") ?? "";

  const hotel = RoomsHotels.find(
    (h) => h.city.toLowerCase() === city.toLowerCase()
  );

  if (!hotel) return <p>Hotel tidak ditemukan.</p>;

  return (
    <section className="bg-[var(--primary)] p-12">
      <h2 className="text-3xl text-white font-bold text-center my-10">
        {hotel.branch}
      </h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="col-span-1 row-span-2">
          <Image
            src={hotel.gallery[0]}
            alt={`${hotel.branch} utama`}
            width={400}
            height={600}
            className="w-full h-full rounded-lg object-cover"
          />
        </div>

        <div className="col-span-2 flex gap-4">
          {hotel.gallery.slice(1, 3).map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`${hotel.branch} gallery ${i + 1}`}
              width={250}
              height={180}
              className="w-1/2 rounded-lg object-cover"
            />
          ))}
        </div>

        <div className="col-span-2 flex gap-4 mt-4">
          {hotel.gallery.slice(3, 6).map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`${hotel.branch} gallery ${i + 4}`}
              width={250}
              height={180}
              className="w-1/3 rounded-lg object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
