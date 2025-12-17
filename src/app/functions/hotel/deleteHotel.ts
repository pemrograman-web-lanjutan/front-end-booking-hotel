export async function deleteHotel(id: number): Promise<boolean> {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:8000/api/hotel/hotels/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Failed to delete hotel:", await res.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error deleting hotel:", error);
    return false;
  }
}
