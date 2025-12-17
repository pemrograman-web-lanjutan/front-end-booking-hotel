"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/dashboard/Navbar";
import Sidebar from "../../../components/dashboard/Sidebar";
import HotelTable from "../../../components/dashboard/HotelTable";
import type { Hotel } from "@/types/Hotel";

export default function HotelsPage() {
  const router = useRouter();

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const hasFetched = useRef(false); // ⬅️ GUARD

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login?redirect=/dashboard/hotels");
      return;
    }

    setIsAuthenticated(true);
    fetchHotels(token);
  }, [router]);

  const fetchHotels = async (token: string) => {
    try {
      const response = await fetch("http://localhost:8000/api/index/hotel", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();

        let hotelsData: Hotel[] = [];

        if (Array.isArray(data)) {
          hotelsData = data;
        } else if (Array.isArray(data.data)) {
          hotelsData = data.data;
        } else if (Array.isArray(data.hotels)) {
          hotelsData = data.hotels;
        }

        setHotels(hotelsData); // ❗ SET SEKALI
      } else {
        setHotels([]);
      }
    } catch (error) {
      console.error(error);
      setHotels([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 overflow-y-auto">
        <Navbar />

        {isLoading ? (
          <p className="mt-4">Loading hotels...</p>
        ) : (
          <HotelTable
            hotels={hotels}
            onRefresh={() => {
              const token = localStorage.getItem("token");
              if (token) fetchHotels(token);
            }}
          />
        )}
      </div>
    </div>
  );
}
