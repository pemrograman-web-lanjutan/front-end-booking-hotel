import { RoomType } from '@/types/Room';

export async function getRoomTypes(): Promise<RoomType[]> {
    try {
        const res = await fetch("http://localhost:8000/api/room-type", {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!res.ok) {
            console.error("Failed to fetch room types:", res.statusText);
            return [];
        }

        const json = await res.json();

        let roomTypesData: RoomType[] = [];

        if (json.data && Array.isArray(json.data)) {
            roomTypesData = json.data;
        } else if (Array.isArray(json)) {
            roomTypesData = json;
        } else {
            console.error("Unexpected format from /api/room-types:", json);
            return [];
        }

        return roomTypesData;
    } catch (error) {
        console.error("Error fetching room types:", error);
        return [];
    }
}
