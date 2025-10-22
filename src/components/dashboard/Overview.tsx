"use client";

import { Receipt, Bed, Users } from "lucide-react";

export default function Overview() {
  const stats = [
    {
      icon: Bed,
      title: "Total Rooms",
      value: 13,
      sub: `10 Kamar tersedia`,
    },
    {
      icon: Receipt,
      title: "Total Bookings",
      value: 18,
      sub: "2 pending",
    },
    {
      icon: Receipt,
      title: "Total Hotel",
      value: 5,
      sub: "-",
    },
    {
      icon: Users,
      title: "Users",
      value: 50,
      sub: "2 new user",
    },
  ];

  return (
    <div>
      <div className="bg-[var(--primary)] text-white px-6 h-30 py-8">
        <h2 className="text-2xl font-semibold">Overview</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 -mt-10">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow p-6 flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">{item.title}</p>
              <h3 className="text-2xl font-bold mt-2">{item.value}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.sub}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <item.icon className="text-[var(--primary)] w-5 h-5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
