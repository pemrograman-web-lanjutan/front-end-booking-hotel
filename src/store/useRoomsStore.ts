import { create } from "zustand";

interface RoomFilters {
    kota_tujuan: string;
    checkin: string;
    checkout: string;
    jumlah_tamu: number;
}

interface RoomsStore {
    rooms: any[]; // Ganti `any` dengan tipe data kamar yang sesuai
    loading: boolean;
    error: string | null;
    filters: RoomFilters;
    setFilters: (filters: Partial<RoomFilters>) => void;
    searchRooms: () => Promise<void>;
}

export const useRoomsStore = create<RoomsStore>((set, get) => ({
  rooms: [],
  loading: false,
  error: null,
  filters: {
    kota_tujuan: "",
    checkin: new Date().toISOString().split("T")[0],
    checkout: new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0],
    jumlah_tamu: 1,
  },

  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),

  searchRooms: async () => {
    set({ loading: true, error: null });
    try {
      const { filters } = get();
      const params = new URLSearchParams({
        kota_tujuan: filters.kota_tujuan,
        checkin: filters.checkin,
        checkout: filters.checkout,
        jumlah_tamu: filters.jumlah_tamu.toString(),
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/search-rooms?${params}`
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil data kamar");
      }

      const data = await response.json();
      set({ rooms: data.data || [], loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));