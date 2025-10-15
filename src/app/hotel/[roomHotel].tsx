"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { RoomsHotels } from "../data/cabang";

export default function RoomHotel() {
  return (
    <section className="bg-white text-black py-12 px-4 md:px-8 lg:px-12">
      {/* Judul */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        Hotel Inferno
      </h2>

      {/* Galeri gambar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 justify-items-center">
        <Image
          src={"/hotel/ubud-1.jpeg"}
          alt="Room"
          width={280}
          height={200}
          className="object-cover rounded-lg shadow-xl w-full h-56 sm:h-64 md:h-72"
        />
        <Image
          src={"/hotel/ubud-1.jpeg"}
          alt="Room"
          width={280}
          height={200}
          className="object-cover rounded-lg shadow-xl w-full h-56 sm:h-64 md:h-72"
        />
        <Image
          src={"/hotel/ubud-1.jpeg"}
          alt="Room"
          width={280}
          height={200}
          className="object-cover rounded-lg shadow-xl w-full h-56 sm:h-64 md:h-72"
        />
      </div>

      {/* Deskripsi */}
      <div className="max-w-3xl mx-auto text-start text-sm md:text-base leading-relaxed">
        <p className="mb-4 text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam minima
          pariatur sapiente quaerat et numquam tempore repellendus, quod
          voluptatibus dignissimos ea ratione quidem neque, a reprehenderit
          quis, sequi perspiciatis in?
        </p>
        <p className="font-semibold text-gray-800">Jl. Ubud No. 1</p>
      </div>
    </section>
  );
}
