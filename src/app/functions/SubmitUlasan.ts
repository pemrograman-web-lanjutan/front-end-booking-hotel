import {toast} from "react-hot-toast";
export async function SubmitUlasan(user_id: number, hotel_id: number, judul: string, deskripsi: string, rating: number){

    try{

        const response = await fetch("http://127.0.0.1:8000/api/reviews/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            credentials: 'include',
            body: JSON.stringify({
                user_id: user_id,
                hotel_id: hotel_id,
                judul: judul,
                deskripsi: deskripsi,
                rating: rating,
            })
        });

        const data = await response.json();

        if(data){

            toast.success(data.message, {
                duration: 2000,
                position: "top-right",
            });

        }else{

            toast.error(data.message, {
                duration: 2000,
                position: "top-right",
            });

        }

        return data;

    }catch (err){

        toast.error(err instanceof Error ? err.message : "Terjadi kesalahan saat login");

    }

}