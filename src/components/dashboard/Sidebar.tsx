"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  User,
  Receipt,
  CreditCard,
  Bed,
  Home,
  BarChart3,
  FileText,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", key: "D" },
    { icon: Receipt, label: "Booking", href: "/dashboard/bookings", key: "B" },
    {
      icon: CreditCard,
      label: "Payments",
      href: "/dashboard/payments",
      key: "P",
    },
    { icon: Bed, label: "Rooms", href: "/dashboard/rooms", key: "R" },
    {
      icon: Home,
      label: "Room Types",
      href: "/dashboard/room-types",
      key: "T",
    },
    { icon: BarChart3, label: "Hotels", href: "/dashboard/hotels", key: "H" },
    { icon: FileText, label: "Reports", href: "/dashboard/reports", key: "R" },
    {
      icon: Settings,
      label: "Settings",
      href: "/dashboard/settings",
      key: "S",
    },
  ];

  return (
    <div className="w-60 bg-[#2c2c2c] text-white flex flex-col flex-shrink-0">
      <div className="h-16 flex items-center justify-center border-b border-white">
        <Image src={"/logo/Asset-6.png"} alt="logo" width={200} height={200} />
      </div>

      <div className="flex items-center justify-center flex-row gap-2 py-5 border-b border-white">
        <div className="w-10 h-10 bg-gray-500 rounded-full mb-2 flex items-center justify-center">
          <User size={24} className="text-gray-300" />
        </div>

        <span className="text-sm">Admin</span>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive
                  ? "bg-[var(--primary)] text-white"
                  : "hover:bg-gray-700"
              }`}>
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
