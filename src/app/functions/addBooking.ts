import { Booking } from "@/types/booking";

export async function addBooking(bookingData: Omit<Booking, 'id' | 'booking_date' | 'cancellation_date'>): Promise<Booking | null> {
    try {
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");

        console.log("Debug Auth - Token:", token ? "Present" : "Missing");
        console.log("Debug Auth - User:", userStr);

        if (userStr) {
            const user = JSON.parse(userStr);
            console.log("Debug Auth - Role:", user.role);
        }

        const res = await fetch("http://localhost:8000/api/bookings", {
            method: "POST",
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
            console.error("Failed to add booking:", res.status, res.statusText, errorText);
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
        console.error("Error adding booking:", error);
        return null;
    }
}
