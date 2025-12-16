import { Booking } from "../../../types/booking";
import { getTokenFromCookies } from "../../../lib/auth";

export default async function getBookingTable(): Promise<Booking[]> {

    try{
        const token = await getTokenFromCookies();

        if (!token) {
            console.error("No token found for booking fetch");
            return [];
        }

        const res = await fetch("http://localhost:8000/api/bookings", {
            cache: "no-store",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if(res.ok){

            const data = await res.json();


            return data as Booking[];
        } else {
            console.error("Failed to fetch bookings: " + res.statusText);
            return [];
        }

    } catch (error){
        console.error("Error fetching bookings:", error);
        return [];
    }
}