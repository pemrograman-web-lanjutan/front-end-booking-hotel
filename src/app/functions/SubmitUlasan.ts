export async function SubmitUlasan(user_id: number, hotel_id: number, judul: string, deskripsi: string, rating: number){



    const response = await fetch("http://127.0.0.1:8000/api/reviews", {

        method: "POST",

        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },

        body: JSON.stringify({hotel_id, judul, deskripsi, rating})

    })

    const data = await response.json()

    return {status: response.status, ...data}

}