import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Hotel,
  DoorOpen,
  Calendar,
} from "lucide-react";

export default function HotelBookingReport() {
  const [selectedPeriod, setSelectedPeriod] = useState("thisYear");

  // Data statistik
  const stats = [
    {
      title: "Total Booking",
      value: "1,847",
      change: "+12.5%",
      isPositive: true,
      icon: Calendar,
      color: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Rooms",
      value: "3,245",
      change: "+8.2%",
      isPositive: true,
      icon: DoorOpen,
      color: "bg-cyan-50",
      iconColor: "text-cyan-600",
    },
    {
      title: "Total Hotels",
      value: "89",
      change: "+2.3%",
      isPositive: true,
      icon: Hotel,
      color: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Total Users",
      value: "4,567",
      change: "+15.8%",
      isPositive: true,
      icon: Users,
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  // Data booking per bulan
  const monthlyData = {
    thisYear: [850, 920, 1250, 1680, 1850, 1520, 1420, 1650],
    lastYear: [720, 680, 890, 1120, 1380, 1150, 980, 1050],
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

  // Data booking per tipe kamar
  const roomTypes = [
    { name: "Standard", value: 4500, color: "bg-blue-400" },
    { name: "Deluxe", value: 6200, color: "bg-cyan-400" },
    { name: "Suite", value: 3800, color: "bg-purple-400" },
    { name: "Presidential", value: 5100, color: "bg-indigo-400" },
    { name: "Family", value: 2400, color: "bg-green-400" },
    { name: "Executive", value: 4800, color: "bg-teal-400" },
  ];

  // Data booking per sumber
  const bookingSources = [
    { name: "Website Langsung", percentage: 35.2, color: "bg-slate-700" },
    { name: "OTA Platform", percentage: 28.5, color: "bg-blue-400" },
    { name: "Mobile App", percentage: 22.3, color: "bg-cyan-400" },
    { name: "Travel Agent", percentage: 14.0, color: "bg-green-400" },
  ];

  const maxValue = Math.max(...monthlyData.thisYear, ...monthlyData.lastYear);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Hotel Booking Report
            </h1>
            <p className="text-gray-500 mt-1">
              Overview of hotel bookings and statistics
            </p>
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}>
            <option value="thisYear">This Year</option>
            <option value="lastYear">Last Year</option>
          </select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600 text-sm font-medium">
                    {stat.title}
                  </span>
                  <div className={`${stat.color} p-2 rounded-lg`}>
                    <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </h3>
                  <div className="flex items-center gap-1">
                    <span
                      className={`text-sm font-semibold ${
                        stat.isPositive ? "text-green-600" : "text-red-600"
                      }`}>
                      {stat.change}
                    </span>
                    {stat.isPositive ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Monthly Bookings
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Comparison of booking trends
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
                <span className="text-sm text-gray-600">This year</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-600">Last year</span>
              </div>
            </div>
          </div>

          <div className="h-80">
            <div className="flex h-full items-end justify-between gap-8 px-4">
              {months.map((month, index) => (
                <div
                  key={month}
                  className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center gap-2 h-64">
                    <div
                      className="flex-1 bg-gray-200 rounded-t-lg relative group cursor-pointer hover:bg-gray-300 transition-colors"
                      style={{
                        height: `${
                          (monthlyData.lastYear[index] / maxValue) * 100
                        }%`,
                      }}>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {monthlyData.lastYear[index]} bookings
                      </div>
                    </div>
                    <div
                      className="flex-1 bg-gray-900 rounded-t-lg relative group cursor-pointer hover:bg-gray-800 transition-colors"
                      style={{
                        height: `${
                          (monthlyData.thisYear[index] / maxValue) * 100
                        }%`,
                      }}>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {monthlyData.thisYear[index]} bookings
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    {month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bookings by Room Type */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Bookings by Room Type
            </h2>
            <div className="space-y-4">
              {roomTypes.map((room) => {
                const maxRoomValue = Math.max(...roomTypes.map((r) => r.value));
                return (
                  <div key={room.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {room.name}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {room.value}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div
                        className={`${room.color} h-full rounded-full transition-all duration-500`}
                        style={{
                          width: `${(room.value / maxRoomValue) * 100}%`,
                        }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bookings by Source */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Bookings by Source
            </h2>
            <div className="space-y-4 mt-8">
              {bookingSources.map((source) => (
                <div key={source.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 ${source.color} rounded-full`}></div>
                      <span className="text-sm font-medium text-gray-700">
                        {source.name}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {source.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`${source.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${source.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Total Booking Sources
                </span>
                <span className="text-xl font-bold text-gray-900">
                  {bookingSources
                    .reduce((sum, s) => sum + s.percentage, 0)
                    .toFixed(1)}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
