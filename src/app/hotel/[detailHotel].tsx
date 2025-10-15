"use client";

import Image from "next/image";

export default function DetailHotel() {
  return (
    <section className="bg-[var(--primary)] p-12">
      <h2 className="text-3xl text-white font-bold text-center my-10">
        Hotel Inferno Cabang Apa?
      </h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="col-span-1 row-span-2">
          <Image
            src={"/hotel/ubud-1.jpeg"}
            alt={` utama`}
            width={400}
            height={600}
            className="w-full h-full rounded-lg object-cover"
          />
        </div>

        <div className="col-span-2 flex gap-4">
          <Image
            src={"/hotel/ubud-2.jpeg"}
            alt={`gallery`}
            width={250}
            height={180}
            className="w-1/2 rounded-lg object-cover"
          />
          <Image
            src={"/hotel/ubud-2.jpeg"}
            alt={`gallery`}
            width={250}
            height={180}
            className="w-1/2 rounded-lg object-cover"
          />
        </div>

        <div className="col-span-2 flex gap-4 mt-4">
          <Image
            src={"/hotel/ubud-3.jpeg"}
            alt={`gallery`}
            width={250}
            height={180}
            className="w-1/3 rounded-lg object-cover"
          />
          <Image
            src={"/hotel/ubud-3.jpeg"}
            alt={`gallery`}
            width={250}
            height={180}
            className="w-1/3 rounded-lg object-cover"
          />
          <Image
            src={"/hotel/ubud-3.jpeg"}
            alt={`gallery`}
            width={250}
            height={180}
            className="w-1/3 rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}
