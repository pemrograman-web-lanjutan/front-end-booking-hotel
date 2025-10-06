// src/app/home/data/reviews.ts
export type Review = {
  id: number;
  name: string;
  avatar: string;
  text: string;
  rating: number;
  date: string;
};

export const reviews: Review[] = [
  {
    id: 1,
    name: "Traveler Terverifikasi",
    avatar: "/user/wisnu-sutradara.jpg",
    text: "Semua staf ramah-ramah, kolam renang bersih, ada tempat bermain anak-anak. Pokoknya nyaman menginap di hotel ini.",
    rating: 5,
    date: "2025-09-29",
  },
  {
    id: 2,
    name: "Siti Aminah",
    avatar: "/user/wisnu-sutradara.jpg",
    text: "Lokasi strategis dekat pusat kota, tapi parkir agak sempit.",
    rating: 3,
    date: "2025-09-20",
  },
  {
    id: 3,
    name: "Andi Wijaya",
    avatar: "/user/wisnu-sutradara.jpg",
    text: "Harga cukup terjangkau, namun sarapan perlu ditingkatkan.",
    rating: 4,
    date: "2025-09-18",
  },
  {
    id: 4,
    name: "Budi Santoso",
    avatar: "/user/wisnu-sutradara.jpg",
    text: "Suasana tenang dan kamar sangat bersih.",
    rating: 5,
    date: "2025-09-15",
  },
  {
    id: 5,
    name: "Dewi Laras",
    avatar: "/user/wisnu-sutradara.jpg",
    text: "Pelayanan ramah tapi AC kamar agak berisik.",
    rating: 4,
    date: "2025-09-10",
  },
  {
    id: 6,
    name: "Rian Saputra",
    avatar: "/user/wisnu-sutradara.jpg",
    text: "Sangat puas! Akan kembali lagi ke sini.",
    rating: 2,
    date: "2025-09-05",
  },
];
