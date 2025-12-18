"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/dashboard/Navbar";
import Sidebar from "../../../components/dashboard/Sidebar";
import Room from "../../../components/dashboard/Room";
import type { RoomType } from "@/types/Room_type";

export default function RoomsPage() {
  const router = useRouter();

  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login?redirect=/dashboard/rooms");
      return;
    }

    setIsAuthenticated(true);
    fetchRooms(token);
  }, [router]);

  const fetchRooms = async (token: string) => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/rooms", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Failed to fetch rooms:", response.statusText);
        setRooms([]);
        return;
      }

      const data = await response.json();

      let roomsData: RoomType[] = [];

      // 🔄 fleksibel: array langsung / data / rooms
      if (Array.isArray(data)) {
        roomsData = data;
      } else if (Array.isArray(data?.data)) {
        roomsData = data.data;
      } else if (Array.isArray(data?.rooms)) {
        roomsData = data.rooms;
      } else {
        console.warn("Unexpected API response format:", data);
      }

      setRooms(roomsData);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setRooms([]);
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
          <p className="mt-4">Loading rooms...</p>
        ) : (
          <Room
            roomTypes={rooms}
            onRefresh={() => {
              const token = localStorage.getItem("token");
              if (token) fetchRooms(token);
            }}
          />
        )}
      </div>
    </div>
  );
}
