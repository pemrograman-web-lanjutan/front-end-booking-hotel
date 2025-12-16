import { useRouter } from "next/navigation";

export async function handleLogout() {
    // Clear localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("pendingBooking");

    // Clear token cookie
    document.cookie = "token=; path=/; max-age=0; SameSite=Strict";

    // Optional: Call logout endpoint if exists
    try {
        await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
            credentials: 'include',
        });
    } catch (error) {
        console.log("Logout endpoint not available");
    }
}
