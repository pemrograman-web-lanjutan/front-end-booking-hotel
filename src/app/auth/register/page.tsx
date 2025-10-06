"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validasi kosong
    if (
      !formData.fullname ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Semua field harus diisi!");
      return;
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Format email tidak valid!");
      return;
    }

    // Cek domain email
    const allowedDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
    ];
    const emailDomain = formData.email.split("@")[1]?.toLowerCase();
    if (!allowedDomains.includes(emailDomain)) {
      setError(
        "Gunakan email dengan domain yang valid (gmail, yahoo, outlook, hotmail)."
      );
      return;
    }

    // Validasi password
    if (formData.password.length < 6) {
      setError("Password minimal 6 karakter!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Konfirmasi password tidak cocok!");
      return;
    }

    console.log("Data berhasil divalidasi:", formData);

    // TODO: simpan data ke backend / API
    router.push("/auth/login"); // setelah register redirect ke login
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl px-6 py-8 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            alt="Your Company"
            src="/logo/Asset-4.png"
            width={80}
            height={80}
            className="mx-auto w-auto"
          />
          <h2
            className="mt-10 text-center text-2xl font-bold tracking-tight"
            style={{ color: "var(--primary)" }}>
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
              className="block w-full rounded-md border px-3 py-2 text-base text-black placeholder-gray-500 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none sm:text-sm"
            />

            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="block w-full rounded-md border px-3 py-2 text-base text-black placeholder-gray-500 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none sm:text-sm"
            />

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="block w-full rounded-md border px-3 py-2 text-base text-black placeholder-gray-500 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none sm:text-sm"
            />

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full rounded-md border px-3 py-2 text-base text-black placeholder-gray-500 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none sm:text-sm"
            />

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="block w-full rounded-md border px-3 py-2 text-base text-black placeholder-gray-500 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none sm:text-sm"
            />

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white bg-[var(--primary)] hover:bg-[#a33c3c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]">
              Sign up
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="font-semibold text-[var(--primary)] hover:text-[#a33c3c]">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
