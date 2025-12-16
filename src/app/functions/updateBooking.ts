import { Booking } from "@/types/booking";

export async function updateBooking(id: string, bookingData: Partial<Booking>): Promise<Booking | null> {
    try {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:8000/api/bookings/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            credentials: "include",
            body: JSON.stringify(bookingData),
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Failed to update booking:", res.status, res.statusText, errorText);
            return null;
        }

        const json = await res.json();

        // Handle different response structures
        if (json.data) {
            return json.data;
        }

        if (json.booking) {
            return json.booking;
        }

        // If the response is the booking itself
        return json;
    } catch (error) {
        console.error("Error updating booking:", error);
        return null;
    }
}
