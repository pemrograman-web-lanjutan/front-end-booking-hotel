"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { handleLogin } from "@/app/auth/handleSubmit";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitPendingBooking = async (bookingData: any, userId: number) => {
    try {
      // Update the user_id to the one who just logged in
      const finalBookingData = { ...bookingData, user_id: userId };

      const response = await fetch("http://localhost:8000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(finalBookingData),
      });

      if (response.ok) {
        toast.success("Booking berhasil dikirim!", { duration: 3000 });
        localStorage.removeItem("pendingBooking");
      } else {
        const errJson = await response.json();
        console.error("Booking error:", errJson);
        toast.error(errJson.message || "Booking gagal!", { duration: 3000 });
      }
    } catch (error) {
      toast.error("Error saat booking: " + error, { duration: 3000 });
    }
  };

  const setTokenCookie = (token: string) => {
    document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60
      }; SameSite=Strict`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await handleLogin(email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Set token as cookie for middleware
      setTokenCookie(data.token);

      // Check for pending booking
      const pendingBooking = localStorage.getItem("pendingBooking");
      if (pendingBooking && pendingBooking !== "undefined" && pendingBooking !== "null") {
        try {
          const bookingData = JSON.parse(pendingBooking);
          // Only submit if it looks like a real object with room_id
          if (bookingData && typeof bookingData === 'object' && bookingData.room_id) {
            await submitPendingBooking(bookingData, data.user.id);
          } else {
            localStorage.removeItem("pendingBooking");
          }
        } catch (e) {
          console.error("Invalid pending booking data", e);
          localStorage.removeItem("pendingBooking");
        }
      }

      if (data.user.role === "admin") {
        router.push(redirectPath === "/" ? "/dashboard" : redirectPath);
      } else {
        router.push(redirectPath);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Terjadi kesalahan saat login"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl px-6 py-8 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            alt="Your Company"
            src="/logo/Asset-4.png"
            width={100}
            height={100}
            className="mx-auto w-auto"
          />
          <h2
            className="mt-10 text-center text-2xl font-bold tracking-tight"
            style={{ color: "var(--primary)" }}>
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border px-3 py-2 text-base text-black placeholder-gray-500 focus:ring-2 focus:ring-[#7A1515] focus:outline-none sm:text-sm"
              />
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border px-3 py-2 text-base text-black placeholder-gray-500 focus:ring-2 focus:ring-[#7A1515] focus:outline-none sm:text-sm"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white bg-[var(--primary)] hover:bg-[#a33c3c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A1515]">
                {isLoading ? "Loading..." : "Sign In"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-400">
            Don’t have an account?{" "}
            <Link
              href="/auth/register"
              className="font-semibold text-[var(--primary)] hover:text-[#a33c3c]">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
