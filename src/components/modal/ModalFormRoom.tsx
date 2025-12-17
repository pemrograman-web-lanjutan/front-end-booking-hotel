"use client";

import { useEffect, useState } from "react";
import { RoomTable, RoomType } from "../../types/Room";
import { Hotel } from "../../types/Hotel";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (room: RoomTable) => void;
  initialData?: RoomTable | null;
}

export default function RoomModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [form, setForm] = useState<RoomTable>({
    id: 0,
    room_number: "",
    id_hotel: 0,
    id_rooms_type: 0,
    status: "available",
    room_type_name: "",
    amenities: "",
  });

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch options directly from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
        setLoading(false);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  // isi otomatis jika mode update
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: ["id", "id_hotel", "id_rooms_type"].includes(name) ? Number(value) : value,
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

          {/* Room Number */}
          <div>
            <label className="block text-sm font-medium">Room Number</label>
            <input
              name="room_number"
              value={form.room_number}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Hotel Selection */}
          <div>
            <label className="block text-sm font-medium">Hotel</label>
            <select
              name="id_hotel"
              value={form.id_hotel || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="" disabled>-- Select Hotel --</option>
              {loading ? (
                <option disabled>Loading hotels...</option>
              ) : (
                hotels.map((hotel) => (
                  <option key={hotel.hotel_id} value={hotel.hotel_id}>
                    {hotel.nama_hotel}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Room Type Selection */}
          <div>
            <label className="block text-sm font-medium">Room Type</label>
            <select
              name="id_rooms_type"
              value={form.id_rooms_type || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="" disabled>-- Select Room Type --</option>
              {loading ? (
                <option disabled>Loading room types...</option>
              ) : (
                roomTypes.map((rt) => (
                  <option key={rt.id} value={rt.id}>
                    {rt.name} -- {rt.amenities ? `(${rt.amenities})` : ""}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border p-2 rounded">
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
              <option value="out of order">Out of Order</option>
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
