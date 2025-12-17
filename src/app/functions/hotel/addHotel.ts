import { Hotel } from "@/types/Hotel";

export async function addHotel(
  hotelData: Omit<Hotel, "id">
): Promise<Hotel | null> {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:8000/api/hotel/hotels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      credentials: "include",
      body: JSON.stringify(hotelData),
    });

    if (!res.ok) {
      console.error("Failed to add hotel:", res.status, await res.text());
      return null;
    }

    const json = await res.json();
    return json.data ?? json.hotel ?? json;
  } catch (error) {
    console.error("Error adding hotel:", error);
    return null;
  }
}
