"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hotel() {
  const [hotels, setHotels] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  const totalImages = 4;

  useEffect(() => {
    async function fetchHotels() {
      try {
        const res = await fetch("http://localhost:8000/api/index/hotel");
        const json = await res.json();

        setHotels(Array.isArray(json.data) ? json.data : []);
      } catch (error) {
        console.error(error);
        setHotels([]);
      }
    }

    fetchHotels();
  }, []);

  // Slideshow hover
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (hoveredIndex !== null) {
      interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % totalImages);
      }, 1200);
    } else {
      setCurrentImage(0);
    }

    return () => clearInterval(interval);
  }, [hoveredIndex]);

  return (
    <section
      id="hotel"
      className="bg-[var(--third)] py-12 px-4 sm:px-6 lg:px-12">
      <h2
        className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-10"
        style={{ color: "var(--primary)" }}>
        Hotel Inferno
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {hotels.slice(0, 3).map((hotel: any, index: number) => (
          <div
            key={index}
            className="group overflow-hidden"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}>
            <div className="relative w-full aspect-[1/1]">
              <Image
                src={
                  hoveredIndex === index
                    ? `/hotel/ubud-${currentImage + 1}.jpeg`
                    : `/hotel/ubud-1.jpeg`
                }
                alt={hotel.cabang_hotel}
                fill
                className="object-cover rounded-tl-2xl transition-all duration-700 ease-in-out"
              />
            </div>

            <div className="p-4 text-start">
              <h3 className="text-base sm:text-lg font-semibold">
                {hotel.cabang_hotel}
              </h3>

              <p className="text-gray-600 text-sm sm:text-base">
                {hotel.alamat_hotel}
              </p>

              <div className="flex justify-start mt-2 gap-1">
                {/* <p className="text-xs text-red-500">
                  raw rating: {String(hotel.rata_rata_rating)}
                </p> */}

                {[...Array(5)].map((_, i) => {
                  const rating = Math.round(
                    Number(hotel.rata_rata_rating ?? 0)
                  );

                  return (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-300 text-gray-300"
                      }`}
                    />
                  );
                })}
              </div>
              <a
                href={`/hotel/${hotel.hotel_id}`}
                className="text-sm sm:text-base font-semibold text-blue-600 hover:text-blue-800 mt-2 block">
                Lihat Detail
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
