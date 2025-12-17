import { Hotel } from '@/types/Hotel';

export async function getHotels(): Promise<Hotel[]> {
    try {
        const res = await fetch("http://localhost:8000/api/hotel", {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!res.ok) {
            console.error("Failed to fetch hotels:", res.statusText);
            return [];
        }

        const json = await res.json();

        let hotelsData: Hotel[] = [];

        if (json.data && Array.isArray(json.data)) {
            hotelsData = json.data;
        } else if (Array.isArray(json)) {
            hotelsData = json;
        } else {
            console.error("Unexpected format from /api/hotels:", json);
            return [];
        }

        return hotelsData;
    } catch (error) {
        console.error("Error fetching hotels:", error);
        return [];
    }
}
