"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RoomHotel({ id }: { id: string }) {
  const [hotel, setHotel] = useState<any | null>(null);

  useEffect(() => {
    async function fetchHotel() {
      try {
        const res = await fetch("http://localhost:8000/api/index/hotel");
        const json = await res.json();

        const data = Array.isArray(json.data) ? json.data : [];
        const found = data.find((item: any) => String(item.id) === String(id));

        setHotel(found || null);
      } catch (error) {
        console.error(error);
        setHotel(null);
      }
    }

    fetchHotel();
  }, [id]);

  return (
    <section className="bg-[var(--third)] text-black py-12 px-4 md:px-8 lg:px-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        Hotel Inferno Cabang {hotel?.cabang_hotel}
      </h2>

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
      <div className="max-w-3xl mx-auto text-justify text-sm md:text-base leading-relaxed">
        <p className="mb-4 text-gray-700">
          Inferno Hotel Cabang Jembrana menawarkan pengalaman menginap premium
          dengan suasana alam tropis khas Bali Barat. Terletak di area yang
          tenang dan jauh dari hiruk-pikuk kota, hotel ini menjadi pilihan ideal
          bagi tamu yang mencari kenyamanan, privasi, dan keindahan lanskap
          alami. Setiap kamar dirancang dengan sentuhan modern yang berpadu
          dengan elemen budaya lokal, menghasilkan nuansa elegan dan hangat.
          Fasilitas yang tersedia mencakup kolam renang infinity bernuansa
          alami, restoran dengan menu khas nusantara, layanan spa, dan area
          relaksasi tepi hutan. Dengan pelayanan profesional dan standar
          kenyamanan tinggi, Inferno Hotel Jembrana memastikan setiap tamu
          mendapatkan pengalaman menginap yang berkesan, baik untuk liburan
          keluarga, perjalanan romantis, maupun kunjungan bisnis.
        </p>
        <p className="font-semibold text-gray-800">{hotel?.alamat_hotel}</p>
      </div>
    </section>
  );
}
