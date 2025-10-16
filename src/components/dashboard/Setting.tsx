"use client";

import { useState } from "react";
import { User as allUsers } from "../../app/data/users";

export default function SettingsPage() {
  const [hotelName, setHotelName] = useState("Inferno Hotel");
  const [hotelEmail, setHotelEmail] = useState("info@inferno.com");
  const [hotelPhone, setHotelPhone] = useState("+62 812 3456 7890");
  const [checkIn, setCheckIn] = useState("14:00");
  const [checkOut, setCheckOut] = useState("12:00");

  const adminUsers = allUsers.filter(
    (u) => u.role === "admin" || u.role === "superadmin"
  );

  const [users, setUsers] = useState(adminUsers);

  const deleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="p-6 space-y-8">
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">General Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Hotel Name</label>
            <input
              className="w-full border rounded-md px-3 py-2"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2"
              value={hotelEmail}
              onChange={(e) => setHotelEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Phone</label>
            <input
              className="w-full border rounded-md px-3 py-2"
              value={hotelPhone}
              onChange={(e) => setHotelPhone(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1">Check-in Time</label>
              <input
                type="time"
                className="w-full border rounded-md px-3 py-2"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Check-out Time</label>
              <input
                type="time"
                className="w-full border rounded-md px-3 py-2"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md">
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Admin Management</h2>

        <table className="w-full border-collapse border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2 text-left">Name</th>
              <th className="border px-3 py-2 text-left">Email</th>
              <th className="border px-3 py-2 text-left">Role</th>
              <th className="border px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{user.fullname}</td>
                <td className="border px-3 py-2">{user.email}</td>
                <td className="border px-3 py-2 capitalize">{user.role}</td>
                <td className="border px-3 py-2">
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md text-xs">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
