"use client";

import { Receipt, Bed, Users, CalendarCheck } from "lucide-react";
import { useEffect, useState } from "react";

interface StatItem {
  key: string;
  value: string | number;
  label: string;
  icon: any;
}

export default function Overview() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8000/api/dashboard/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }

        const rawData = await response.json();
        // Handle common API response patterns where data is wrapped in a 'data' property
        const data = rawData.data || rawData;

        const items: StatItem[] = [];

        Object.entries(data).forEach(([key, value]) => {
          // Skip if value is null or an object (prevent React error)
          if (value === null || typeof value === 'object') return;

          let Icon = Receipt;
          const lowerKey = key.toLowerCase();

          if (lowerKey.includes("book")) Icon = CalendarCheck;
          else if (lowerKey.includes("user") || lowerKey.includes("customer") || lowerKey.includes("guest")) Icon = Users;
          else if (lowerKey.includes("room") || lowerKey.includes("bed")) Icon = Bed;
          else if (lowerKey.includes("revenue") || lowerKey.includes("money") || lowerKey.includes("income")) Icon = Receipt;

          // Format label: "total_revenue" -> "Total Revenue"
          const label = key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

          items.push({
            key,
            value: value as string | number,
            label,
            icon: Icon
          });
        });

        setStats(items);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-6">Loading stats...</div>;
  }

  return (
    <div>
      <div className="bg-[var(--primary)] text-white px-6 h-30 py-8">
        <h2 className="text-2xl font-semibold">Overview</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 -mt-10">
        {stats.length > 0 ? (
          stats.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow p-6 flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{item.label}</p>
                <h3 className="text-2xl font-bold mt-2">
                  {(item.key.includes('revenue') || item.key.includes('total_amount')) && !isNaN(Number(item.value))
                    ? `Rp ${Number(item.value).toLocaleString('id-ID')}`
                    : item.value}
                </h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <item.icon className="text-[var(--primary)] w-5 h-5" />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-4 bg-white rounded-xl shadow">
            <p className="text-gray-500">No stats available</p>
          </div>
        )}
      </div>
    </div>
  );
}
