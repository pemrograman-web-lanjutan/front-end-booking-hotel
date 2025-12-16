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
            let errorMessage = res.statusText;

            try {
                // Try to parse the error as JSON
                const errorJson = JSON.parse(errorText);
                errorMessage = errorJson.message || errorJson.error || errorMessage;
            } catch (e) {
                // If not JSON, use the raw text if available
                if (errorText) {
                    errorMessage = errorText;
                }
            }

            console.error("Failed to update booking:", res.status, res.statusText, errorMessage);
            throw new Error(errorMessage);
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
        throw error;
    }
}
