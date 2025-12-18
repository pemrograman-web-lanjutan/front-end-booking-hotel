export async function deleteRoom(id: number): Promise<boolean> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    console.error(await res.text());
    return false;
  }

  return true;
}
