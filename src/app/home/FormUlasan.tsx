"use client";

// import { RoomsHotels } from "../data/cabang";
export default function FormUlasan() {
  return (
    <div className="p-5">
      <form className="p-6 rounded-2xl shadow-md">
        <h2 className="text-4xl text-[var(--primary)] font-semibold mb-4 text-center">
          Beri Ulasan
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pilih Hotel
          </label>
          <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option value="">-- Pilih Hotel --</option>
          </select>
        </div>

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
            placeholder="Tulis ulasan Anda di sini..."></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} className="cursor-pointer text-2xl">
                <input type="radio" name="rating" className="hidden" />
                <span className={`${"text-yellow-400"}`}>★</span>
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
