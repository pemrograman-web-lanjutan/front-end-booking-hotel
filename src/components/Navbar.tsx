"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in by looking for token in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setIsLoggedIn(false);
    
    router.push("/");
  };

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
        {!isLoggedIn ? (
          <Link href="/auth/login">
            <button className="border px-3 py-1 rounded-full hover:bg-[var(--primary)] hover:text-white">
              Sign In
            </button>
          </Link>
        ) : (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2 hover:bg-gray-100 rounded-full">
              <User className="w-6 h-6" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
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
            {!isLoggedIn ? (
              <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                <button className="border px-3 py-1 rounded-full hover:bg-[var(--primary)] hover:text-white">
                  Sign In
                </button>
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center text-[var(--primary)] hover:underline">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
