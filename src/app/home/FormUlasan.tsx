"use client";
import { Hotel } from "@/types/Hotel";
import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { SubmitUlasan } from "@/app/functions/SubmitUlasan";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function FormUlasan() {
  const [judul, setJudul] = useState<string>("");
  const [deskripsi, setDeskripsi] = useState<string>("");
  const [rating, setRating] = useState<number>(1);
  const [selectedHotelId, setSelectedHotelId] = useState<number>(0);
  const [hotel, setHotel] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      toast.error("Silakan login terlebih dahulu!");
      router.push("/auth/login");
      return;
    }

    if (selectedHotelId === 0) {
      toast.error("Pilih hotel terlebih dahulu!");
      return;
    }

    try {
      setLoading(true);
      const response = await SubmitUlasan(
        selectedHotelId, // ✅ gunakan selectedHotelId, bukan hotel_id param
        judul,
        deskripsi,
        rating
      );

      if (response.status === 201 || response.status === 200) {
        toast.success(response.message || "Ulasan berhasil dikirim");
        router.push("/");
      } else {
        toast.error(
          response.message || "Terjadi kesalahan saat mengirim ulasan"
        );
      }
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengirim ulasan"
      );
    } finally {
      setLoading(false);
    }
  };

  const getHotel = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/index/hotel");
    const data = await response.json();
    return data.data;
  };

  useEffect(() => {
    setLoading(true);
    getHotel()
      .then((data) => setHotel(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-5 bg-[var(--third)]">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="p-6 rounded-2xl shadow-md">
        <h2 className="text-4xl text-[var(--primary)] font-semibold mb-4 text-center">
          Beri Ulasan
        </h2>

        {/* PILIH HOTEL */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pilih Hotel
          </label>
          <select
            disabled={loading}
            value={selectedHotelId}
            onChange={(e) => setSelectedHotelId(Number(e.target.value))}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option value={0}>-- Pilih Hotel --</option>
            {loading ? (
              <option disabled>Loading...</option>
            ) : hotel && hotel.length > 0 ? (
              hotel.map((h, index) => (
                <option key={`hotel-${h.hotel_id}-${index}`} value={h.hotel_id}>
                  {h.nama_hotel}
                </option>
              ))
            ) : (
              <option disabled>Tidak ada hotel tersedia</option>
            )}
          </select>
        </div>

        {/* JUDUL */}
        <div className="mb-4">
          <label
            htmlFor="judul"
            className="block text-sm font-medium text-gray-700 mb-1">
            Judul Ulasan
          </label>
          <input
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-gray-500"
            type="text"
            name="judul"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            id="judul"
            placeholder="Tulis judul ulasan Anda di sini..."
            required
          />
        </div>

        {/* DESKRIPSI */}
        <div className="mb-4">
          <label
            htmlFor="review"
            className="block text-sm font-medium text-gray-700 mb-1">
            Ulasan Anda
          </label>
          <textarea
            id="review"
            rows={4}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Tulis ulasan Anda di sini..."
            required
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}></textarea>
        </div>

        {/* RATING */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <Rating
            name="rating"
            value={rating}
            onChange={(_, newValue) => setRating(newValue || 1)}
            size="large"
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 px-4 rounded-lg transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed opacity-70"
              : "bg-[var(--primary)]"
          }`}>
          {loading ? "Loading..." : "Kirim Ulasan"}
        </button>
      </form>
    </div>
  );
}