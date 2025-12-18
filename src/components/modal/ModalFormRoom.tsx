"use client";

import { useEffect, useState } from "react";

import { RoomType } from "@/types/Room_type";

interface Props {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: RoomType) => void;
  initialData?: RoomType | null;
}

export default function RoomModal({
  open,
  loading,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [form, setForm] = useState<RoomType>({
    id: 0,
    name: "",
    max_occupancy: 1,
    bed_type: "single",
    price_per_night: 0,
    amenities: "",
    description: "",
  });

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Fetch options directly from API
  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      try {
        console.log("Fetching hotels and room types...");

        // Fetch Hotels
        const resHotels = await fetch("http://localhost:8000/api/hotel");
        const jsonHotels = await resHotels.json();
        console.log("Hotels response:", jsonHotels);

        let hotelsData: Hotel[] = [];
        if (jsonHotels.data && Array.isArray(jsonHotels.data)) {
          hotelsData = jsonHotels.data;
        } else if (Array.isArray(jsonHotels)) {
          hotelsData = jsonHotels;
        }
        setHotels(hotelsData);

        // Fetch Room Types
        const resRoomTypes = await fetch("http://localhost:8000/api/room-type");
        const jsonRoomTypes = await resRoomTypes.json();
        console.log("Room Types response:", jsonRoomTypes);

        let roomTypesData: RoomType[] = [];
        if (jsonRoomTypes.data && Array.isArray(jsonRoomTypes.data)) {
          roomTypesData = jsonRoomTypes.data;
        } else if (Array.isArray(jsonRoomTypes)) {
          roomTypesData = jsonRoomTypes;
        }
        setRoomTypes(roomTypesData);
      } catch (error) {
        console.error("Error fetching data for modal:", error);
      } finally {
        setDataLoading(false);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  useEffect(() => {
    if (initialData) {
      setForm({
        id: initialData.id,
        room_number: initialData.room_number,
        id_hotel: initialData.id_hotel,
        id_rooms_type: initialData.id_rooms_type,
        status: initialData.status,
        room_type_name: initialData.room_type?.name || "",
        amenities: initialData.room_type?.amenities || "",
      });
    } else {
      // Reset form for create
      setForm({
        id: 0,
        room_number: "",
        id_hotel: 0,
        id_rooms_type: 0,
        status: "available",
        room_type_name: "",
        amenities: "",
      });
    }
  }, [initialData, open]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "max_occupancy" || name === "price_per_night"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Room Type" : "Tambah Room Type"}
        </h3>
        <div className="space-y-3">
          <input
            name="name"
            placeholder="Room Type Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <select
            name="bed_type"
            value={form.bed_type}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded">
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="twin">Twin</option>
            <option value="king">King</option>
            <option value="queen">Queen</option>
          </select>

          <input
            type="number"
            name="max_occupancy"
            placeholder="Max Occupancy"
            value={form.max_occupancy}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="number"
            name="price_per_night"
            placeholder="Price per Night"
            value={form.price_per_night}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <textarea
            name="amenities"
            placeholder="Amenities"
            value={form.amenities ?? ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description ?? ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Batal
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded">
            {loading ? "Saving..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}
