"use client";

import { useState } from "react";
import { RoomsHotels } from "../../data/cabang";
import { reviews, Review } from "../../data/ulasan";
export default function Ulasan() {
  const [selectedHotel, setSelectedHotel] = useState<number | null>(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedHotel) {
      alert("Silakan pilih hotel terlebih dahulu!");
      return;
    }

    // bikin data review baru
    const newReview: Review = {
      id: reviews.length + 1,
      name: "Traveler Baru", // bisa diganti dari auth user nanti
      avatar: "/user/default-avatar.png",
      text: review,
      rating,
      date: new Date().toISOString().split("T")[0],
    };

    // sementara console.log
    console.log("Hotel ID:", selectedHotel);
    console.log("Review Baru:", newReview);

    alert(
      `Terima kasih atas ulasan Anda!\nHotel: ${
        RoomsHotels.find((h) => h.id === selectedHotel)?.branch
      }\nRating: ${rating}\nUlasan: ${review}`
    );

    // reset form
    setReview("");
    setRating(0);
    setSelectedHotel(null);

    // kalau mau langsung push ke reviews (dummy)
    reviews.push(newReview);
  };

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit} className="p-6 rounded-2xl shadow-md">
        <h2 className="text-4xl text-[var(--primary)] font-semibold mb-4 text-center">
          Beri Ulasan
        </h2>

        {/* Pilih Hotel */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pilih Hotel
          </label>
          <select
            value={selectedHotel ?? ""}
            onChange={(e) => setSelectedHotel(Number(e.target.value))}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option value="">-- Pilih Hotel --</option>
            {RoomsHotels.map((hotel) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.branch} ({hotel.city})
              </option>
            ))}
          </select>
        </div>

        {/* Input Ulasan */}
        <div className="mb-4">
          <label
            htmlFor="review"
            className="block text-sm font-medium text-gray-700 mb-1">
            Ulasan Anda
          </label>
          <textarea
            id="review"
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Tulis ulasan Anda di sini..."></textarea>
        </div>

        {/* Rating Bintang */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} className="cursor-pointer text-2xl">
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  checked={rating === star}
                  onChange={() => setRating(star)}
                  className="hidden"
                />
                <span
                  className={`${
                    rating >= star ? "text-yellow-400" : "text-gray-400"
                  }`}>
                  ★
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          className="w-full bg-[var(--primary)] text-white py-2 px-4 rounded-lg transition">
          Kirim Ulasan
        </button>
      </form>
    </div>
  );
}
