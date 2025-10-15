"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { RoomsHotels } from "../data/cabang";

export default function RoomHotel() {
  return (
    <section className="bg-white text-black py-16 px-6 md:px-8">
      <h2 className="text-3xl font-bold text-center mb-10">Hotel Inferno</h2>

      <div className="flex justify-center items-center gap-10 mb-10">
        <Image
          src={"/hotel/ubud-1.jpeg"}
          alt={`Room`}
          width={280}
          height={200}
          className={`object-cover shadowrounded-lg shadow-2xl`}
        />
        <Image
          src={"/hotel/ubud-1.jpeg"}
          alt={`Room`}
          width={280}
          height={200}
          className={`object-cover shadowrounded-lg shadow-2xl`}
        />
        <Image
          src={"/hotel/ubud-1.jpeg"}
          alt={`Room`}
          width={280}
          height={200}
          className={`object-cover shadowrounded-lg shadow-2xl`}
        />
      </div>

      <div className="max-w-4xl mx-auto text-start text-sm leading-relaxed">
        <p className="mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam minima
          pariatur sapiente quaerat et numquam tempore repellendus, quod
          voluptatibus dignissimos ea ratione quidem neque, a reprehenderit
          quis, sequi perspiciatis in?
        </p>
        <p className="font-semibold">jl. Ubud no 1</p>
      </div>
    </section>
  );
}
