"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/bookings": "Booking",
    "/dashboard/payments": "Payments",
    "/dashboard/rooms": "Rooms",
    "/dashboard/room-types": "Room Types",
    "/dashboard/hotels": "Hotels",
    "/dashboard/reports": "Reports",
    "/dashboard/settings": "Settings",
  };

  const currentTitle = pageTitles[pathname] || "Dashboard";

  const router = useRouter();

  const handleLogout = () => {
    alert("Keluar dari sistem");
    router.push("/");
  };

  return (
    <div className="w-full flex items-center justify-between bg-white px-6 py-3">
      <h1 className="text-lg font-semibold">Welcome to {currentTitle}</h1>

      <button
        onClick={handleLogout}
        className="text-sm text-red-600 font-medium hover:underline">
        Keluar
      </button>
    </div>
  );
}
