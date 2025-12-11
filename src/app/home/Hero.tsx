"use client";
import {
  Calendar,
  MapPin,
  Moon,
  Users,
  Minus,
  Plus,
  Search,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect } from "react";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [open, setOpen] = useState(false);

  const [jumlahTamu, setJumlahTamu] = useState(1);

  const [checkIn, setCheckIn] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [duration, setDuration] = useState(1);
  const [checkOut, setCheckOut] = useState("");
  useEffect(() => {
    const inDate = new Date(checkIn);
    inDate.setDate(inDate.getDate() + duration);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    setCheckOut(inDate.toLocaleDateString("id-ID", options));
  }, [checkIn, duration]);

  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query) {
      alert("Silahkan pilih Kota tujuan Anda terlebih dahulu!");
      return;
    }
    router.push(`/rooms`);
  };

  return (
    <div id="home" className="min-h-screen pb-10">
      <div className="bg-[var(--primary)] text-white flex flex-col md:flex-row justify-between items-center px-8 pt-20 pb-15 gap-10">
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-bold">Reservasi Kamar Hotel Inferno</h1>
          <p className="text-sm">
            Temukan harga terbaik untuk setiap produk Traveloka yang Anda
            butuhkan.
          </p>
        </div>

        <div className="flex-1 max-w-lg">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            loop={true}
            className="rounded-xl overflow-hidden">
            <SwiperSlide>
              <Image
                src="/hero/slide1.png"
                alt="Slide 1"
                width={600}
                height={400}
                className="object-cover w-full h-64"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/hero/slide1.png"
                alt="Slide 2"
                width={600}
                height={400}
                className="object-cover w-full h-64"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/hero/slide1.png"
                alt="Slide 3"
                width={600}
                height={400}
                className="object-cover w-full h-64"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="flex justify-center -mt-10 relative z-10">
        <div className="bg-gray-200 p-6 rounded-2xl shadow-md w-full max-w-4xl">
          <form onSubmit={handleSearch} className="items-end" method="post">
            <div className="relative flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Kota Tujuan</label>
              <div className="relative w-full">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <select name="kota_tujuan" value={query} id="" onChange={(e) => setQuery(e.target.value)} className="w-full p-3 pl-10 rounded-xl border border-gray-400 focus:ring-2 focus:ring-[var(--primary)] outline-none cursor-pointer">
                  <option value="" disabled>-- Pilih Kota Tujuan --</option>
                  <option value="Badung">Badung</option>
                  <option value="Gianyar">Gianyar</option>
                  <option value="Denpasar">Denpasar</option>
                  <option value="Tabanan">Tabanan</option>
                  <option value="Karangasem">Karangasem</option>
                  <option value="Bangli">Bangli</option>
                  <option value="Buleleng">Buleleng</option>
                  <option value="Klungkung">Klungkung</option>
                  <option value="Jembrana">Jembrana</option>
                  <option value="Nusa Penida">Nusa Penida</option>
                </select>
              </div>

            </div>

            <div className="flex flex-row items-center justify-between mt-4 space-x-4">
              <div className="flex-1 mr-4">
                <label className="text-sm text-gray-600 mb-1">Check-in :</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type="date"
                    name="checkin"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full p-3 pl-10 rounded-xl border border-gray-400 focus:ring-2 focus:ring-[var(--primary)] outline-none"
                    
                  />
                </div>
              </div>

              <div className="flex-1">
                <label className="text-sm text-gray-600 mb-1">Duration</label>
                <div className="relative">
                  <Moon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <select
                    name="duration"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full p-3 pl-10 rounded-xl border border-gray-400 focus:ring-2 focus:ring-[var(--primary)] outline-none">
                    {Array.from({ length: 7 }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>
                        {d} Malam
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex-1 hidden sm:block">
                <label className="text-sm text-gray-600 mb-1">
                  Check-Out :
                </label>
                <input
                  type="text"
                  value={checkOut}
                  disabled
                  className="w-full p-3 rounded-xl border border-gray-400 bg-gray-100 text-gray-700"
                  name="checkout"
                />
              </div>
            </div>

            <div className="flex flex-col md:col-span-3 relative">
              <label className="text-sm text-gray-600 mb-1">
                Jumlah Tamu
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="number"
                  value={jumlahTamu}
                  onChange={(e) => setJumlahTamu(Number(e.target.value))}
                  min={1}
                  max={4}
                  name="jumlah_tamu"
                  className="w-full p-3 pl-10 rounded-xl border border-gray-400 cursor-pointer"
                  placeholder="Jumlah Tamu"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="flex gap-2 bg-[var(--primary)] text-white font-semibold rounded-full px-6 py-3 hover:bg-[#a33c3c] transition">
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
