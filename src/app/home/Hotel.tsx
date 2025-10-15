"use client";

import Image from "next/image";
import { Star } from "lucide-react";

export default function Hotel() {
  return (
    <section id="hotel" className="py-12 px-4 sm:px-6 lg:px-12">
      <h2
        className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-10"
        style={{ color: "var(--primary)" }}
      >
        Hotel Inferno
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="group">
          <Image
            src={"/hotel/ubud-1.jpeg"}
            alt={"Hotel"}
            width={400}
            height={600}
            className="w-full aspect-[3/4] object-cover rounded-t-2xl transition-all duration-500"
          />

          <div className="p-4 text-start">
            <h3 className="text-base sm:text-lg font-semibold">Ubud Hotel</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Hotek Inferno Ubud
            </p>

            <div className="flex justify-start mt-2">
              <Star
                className={`w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400`}
              />
            </div>

            <a
              href={`/hotel`}
              className="text-sm sm:text-base font-semibold text-blue-600 hover:text-blue-800 mt-2 block"
            >
              Lihat Detail
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
