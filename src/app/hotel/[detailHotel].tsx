"use client";

import Image from "next/image";

export default function DetailHotel() {
  return (
    <section className="bg-[var(--primary)] px-6 py-12 md:px-12">
      <h2 className="text-2xl md:text-3xl text-white font-bold text-center my-10">
        Hotel Inferno Cabang Apa?
      </h2>

      {/* Grid utama */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Gambar utama */}
        <div className="md:col-span-1 md:row-span-2">
          <Image
            src={"/hotel/ubud-1.jpeg"}
            alt="utama"
            width={400}
            height={600}
            className="w-full h-64 md:h-full rounded-lg object-cover"
          />
        </div>

        {/* Baris atas dua gambar */}
        <div className="md:col-span-2 flex flex-col md:flex-row gap-4">
          <Image
            src={"/hotel/ubud-2.jpeg"}
            alt="gallery"
            width={250}
            height={180}
            className="w-full md:w-1/2 h-48 rounded-lg object-cover"
          />
          <Image
            src={"/hotel/ubud-2.jpeg"}
            alt="gallery"
            width={250}
            height={180}
            className="w-full md:w-1/2 h-48 rounded-lg object-cover"
          />
        </div>

        {/* Baris bawah tiga gambar */}
        <div className="md:col-span-2 flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
          <Image
            src={"/hotel/ubud-3.jpeg"}
            alt="gallery"
            width={250}
            height={180}
            className="w-full md:w-1/3 h-40 rounded-lg object-cover"
          />
          <Image
            src={"/hotel/ubud-3.jpeg"}
            alt="gallery"
            width={250}
            height={180}
            className="w-full md:w-1/3 h-40 rounded-lg object-cover"
          />
          <Image
            src={"/hotel/ubud-3.jpeg"}
            alt="gallery"
            width={250}
            height={180}
            className="w-full md:w-1/3 h-40 rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}
