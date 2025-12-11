"use client";

import { useEffect, useState } from "react";
import { Room } from "../../types/Room";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (room: Room) => void;
  initialData?: Room | null;
}

export default function RoomModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [form, setForm] = useState<Room>({
    roomId: "",
    roomType: "",
    bedType: "",
    maxOccupancy: 1,
    amenities: "",
    status: "available",
  });

  // isi otomatis jika mode update
  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "maxOccupancy" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Update Room" : "Create Room"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Room ID</label>
            <input
              name="roomId"
              value={form.roomId}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
              disabled={!!initialData}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Room Type</label>
            <input
              name="roomType"
              value={form.roomType}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Bed Type</label>
            <input
              name="bedType"
              value={form.bedType}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Max Occupancy</label>
            <input
              type="number"
              name="maxOccupancy"
              value={form.maxOccupancy}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              min={1}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Amenities</label>
            <textarea
              name="amenities"
              value={form.amenities}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border p-2 rounded">
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded">
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
