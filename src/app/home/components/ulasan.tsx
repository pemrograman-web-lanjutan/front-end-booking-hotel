"use client";

import { useState } from "react";

export default function Ulasan() {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Ulasan:", review);
    console.log("Rating:", rating);
    alert(
      `Terima kasih atas ulasan Anda!\nRating: ${rating}\nUlasan: ${review}`
    );
  };

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit} className=" p-6 rounded-2xl shadow-md">
        <h2 className="text-4xl text-[var(--primary)] font-semibold mb-4 text-center">
          Beri Ulasan
        </h2>

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
