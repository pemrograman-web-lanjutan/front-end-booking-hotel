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
import { useRoomsStore } from "@/store/useRoomsStore";

export default function SearchForm() {
  const { filters, setFilters, searchRooms } = useRoomsStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ [name]: value });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchRooms();
  };

  return (
    <div className="flex justify-center mt-10 relative z-10 mb-10">
      <div className="bg-gray-200 p-6 rounded-2xl shadow-md w-full max-w-4xl">
        <form onSubmit={handleSearch} className="items-end" method="post">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Kota Tujuan</label>
            <div className="relative w-full">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <select
                name="kota_tujuan"
                id=""
                onChange={handleInputChange}
                className="w-full p-3 pl-10 rounded-xl border border-gray-400 focus:ring-2 focus:ring-[var(--primary)] outline-none cursor-pointer">
                <option value="" disabled>
                  -- Pilih Kota Tujuan --
                </option>
                <option value={filters.kota_tujuan || ""} selected>
                  {filters.kota_tujuan}
                </option>
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
                  value={filters.checkin || ""}
                  onChange={handleInputChange}
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
              <label className="text-sm text-gray-600 mb-1">Check-Out :</label>
              <input
                type="date"
                value={filters.checkout || ""}
                disabled
                className="w-full p-3 rounded-xl border border-gray-400 bg-gray-100 text-gray-700"
                name="checkout"
              />
            </div>
          </div>

          <div className="flex flex-col md:col-span-3 relative">
            <label className="text-sm text-gray-600 mb-1">Jumlah Tamu</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="number"
                value={filters.jumlah_tamu || ""}
                onChange={handleInputChange}
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
  );
}
