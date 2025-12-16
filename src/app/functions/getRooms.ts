import { RoomDetail } from '@/types/Room';

export async function getRooms(): Promise<RoomDetail[]> {
    try {
        const res = await fetch("http://localhost:8000/api/room-and-hotel", {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!res.ok) {
            console.error("Failed to fetch rooms:", res.statusText);
            return [];
        }

        const json = await res.json();

        // Log untuk debugging - lihat struktur response
        console.log("API Response dari getRooms:", json);

        // Handle berbagai format response dari Laravel
        let roomsData: RoomDetail[] = [];

        // Format 1: { data: [...] }
        if (json.data && Array.isArray(json.data)) {
            roomsData = json.data;
        }
        // Format 2: { rooms: [...] }
        else if (json.rooms && Array.isArray(json.rooms)) {
            roomsData = json.rooms;
        }
        // Format 3: langsung array [...]
        else if (Array.isArray(json)) {
            roomsData = json;
        }
        // Format tidak dikenali
        else {
            console.error("Format response tidak dikenali:", json);
            console.error("Tipe data:", typeof json);
            return [];
        }

        console.log("Rooms data berhasil diparse:", roomsData);
        return roomsData;

    } catch (error) {
        console.error("Error di getRooms:", error);
        return [];
    }
}