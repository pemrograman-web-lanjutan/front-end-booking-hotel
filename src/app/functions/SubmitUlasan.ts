export async function SubmitUlasan(
  hotel_id: number,
  judul: string,
  deskripsi: string,
  rating: number
) {
  const token = localStorage.getItem("token");

  if (!token) {
    return {
      status: 401,
      message: "Token tidak ditemukan. Silakan login dulu.",
    };
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      // credentials: "include",
      body: JSON.stringify({ hotel_id, judul, deskripsi, rating }),
    });

    const data = await response.json();
    return { status: response.status, ...data };
  } catch (error) {
    console.error("Gagal mengirim ulasan:", error);
    return { status: 500, message: "Terjadi kesalahan koneksi ke server." };
  }
}
