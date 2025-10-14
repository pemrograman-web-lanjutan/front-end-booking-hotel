"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { RoomsHotels } from "../../data/cabang";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Hotel() {
  const router = useRouter();

  return (
    <section id="hotel" className="py-12 px-4 sm:px-6 lg:px-12">
      <h2
        className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-10"
        style={{ color: "var(--primary)" }}>
        Hotel Inferno
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {RoomsHotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </section>
  );
}

function HotelCard({ hotel }: { hotel: any }) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (hovering && hotel.image?.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % hotel.image.length);
      }, 1000);
    } else {
      setCurrentIndex(0);
    }
    return () => clearInterval(interval);
  }, [hovering, hotel.image]);

  return (
    <div
      className="group"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}>
      <Image
        src={hotel.image[currentIndex].src}
        alt={hotel.image[currentIndex].alt}
        width={400}
        height={600}
        className="w-full aspect-[3/4] object-cover rounded-t-2xl transition-all duration-500"
      />

      <div className="p-4 text-start">
        <h3 className="text-base sm:text-lg font-semibold">{hotel.city}</h3>
        <p className="text-gray-600 text-sm sm:text-base">{hotel.branch}</p>

        <div className="flex justify-start mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => router.push(`/hotel?city=${hotel.city.toLowerCase()}`)}
          className="text-sm sm:text-base font-semibold text-blue-600 hover:text-blue-800 mt-2 block">
          Lihat Detail
        </button>
      </div>
    </div>
  );
}
