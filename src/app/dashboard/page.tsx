"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";
import BookingTable from "../../components/dashboard/BookingTable";
import type { Booking } from "../../types/booking";

interface DashboardProps {
  children?: React.ReactNode;
}

export default function Dashboard() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login?redirect=/dashboard");
      return;
    }

    setIsAuthenticated(true);
    fetchBookings(token);
  }, [router]);

  const fetchBookings = async (token: string) => {
    try {
      const response = await fetch("http://localhost:8000/api/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();

        // Handle different API response formats
        let bookingsData: Booking[] = [];

        if (Array.isArray(data)) {
          bookingsData = data;
        } else if (data.data && Array.isArray(data.data)) {
          bookingsData = data.data;
        } else if (data.bookings && Array.isArray(data.bookings)) {
          bookingsData = data.bookings;
        } else {
          console.warn("Unexpected API response format:", data);
          bookingsData = [];
        }

        setBookings(bookingsData);
      } else {
        console.error("Failed to fetch bookings:", response.statusText);
        setBookings([]);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <Navbar />
        <BookingTable
          bookings={bookings}
          onRefresh={() => {
            const token = localStorage.getItem("token");
            if (token) fetchBookings(token);
          }}
        />
      </div>
    </div>
  );
}
