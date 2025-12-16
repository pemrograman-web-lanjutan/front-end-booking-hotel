export async function deleteBooking(id: string): Promise<boolean> {
    try {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:8000/api/bookings/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            credentials: "include",
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Failed to delete booking:", res.status, res.statusText, errorText);
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error deleting booking:", error);
        return false;
    }
}
