import { Users } from "@/types/User";

export async function getUsers(): Promise<Users[]> {
  try {
    const res = await fetch("http://localhost:8000/api/users", {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Failed to fetch users:", res.statusText);
      return [];
    }

    const json = await res.json();

    // 🔥 FIX UTAMA DI SINI
    if (Array.isArray(json)) {
      return json;
    }

    if (Array.isArray(json.data)) {
      return json.data;
    }

    if (Array.isArray(json.users)) {
      return json.users;
    }

    console.error("Unexpected users response shape:", json);
    return [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
