"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center bg-white px-6 py-4 shadow fixed w-full z-20">
      <div className="flex items-center space-x-2">
        <Image src={"/logo/Asset-5.png"} width={150} height={150} alt="logo" />
      </div>

      {/* Menu Desktop */}
      <div className="hidden md:flex space-x-6 justify-center items-center">
        <a href="/" className="hover:text-[var(--primary)]">
          Home
        </a>
        <a href="#about" className="hover:text-[var(--primary)]">
          About Us
        </a>
        <a href="#hotel" className="hover:text-[var(--primary)]">
          Hotel
        </a>
        <a href="/auth/login" className="text-[var(--primary)] hover:underline">
          Login
        </a>
        <Link href="/auth/register">
          <button className="border px-3 py-1 rounded-full hover:bg-[var(--primary)] hover:text-white">
            Sign In
          </button>
        </Link>
      </div>

      {/* Tombol Hamburger Mobile */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg md:hidden">
          <div className="flex flex-col items-center space-y-4 py-6">
            <a
              href="/"
              className="hover:text-[var(--primary)]"
              onClick={() => setIsOpen(false)}>
              Home
            </a>
            <a
              href="#about"
              className="hover:text-[var(--primary)]"
              onClick={() => setIsOpen(false)}>
              About Us
            </a>
            <a
              href="#hotel"
              className="hover:text-[var(--primary)]"
              onClick={() => setIsOpen(false)}>
              Hotel
            </a>
            <a
              href="/auth/login"
              className="text-[var(--primary)] hover:underline"
              onClick={() => setIsOpen(false)}>
              Login
            </a>
            <Link href="/auth/register" onClick={() => setIsOpen(false)}>
              <button className="border px-3 py-1 rounded-full hover:bg-[var(--primary)] hover:text-white">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
