// status hotel = available, fully_booked, maintenance, closed
// status rooms = available, few_left, fully_booked, maintenance

export const RoomsHotels = [
  {
    id: 1,
    city: "Ubud",
    branch: "Inferno Hotel Ubud",
    address: "Jl. Raya Ubud No.1",
    rating: 4,
    status: "available",

    image: "/hotel/Roomcanggu-2.png",
    gallery: [
      "/canggu/canggu-1.png",
      "/canggu/canggu-2.png",
      "/canggu/canggu-3.png",
      "/canggu/canggu-4.png",
      "/canggu/canggu-5.png",
      "/canggu/canggu-6.png",
    ],
    galeryRooms: [
      { src: "/hotel/roomCanggu-1.png", alt: "Kamar Inferno Ubud kiri" },
      { src: "/hotel/roomCanggu-2.png", alt: "Kamar Inferno Ubud tengah" },
      { src: "/hotel/roomCanggu-3.png", alt: "Kamar Inferno Ubud kanan" },
    ],
    description:
      "Inferno Hotel Ubud menghadirkan suasana tenang di tengah alam Bali. Kamar nyaman dilengkapi AC, WiFi, dan balkon dengan pemandangan tropis. Cocok untuk wisatawan yang mencari ketenangan.",
    facilities: ["WiFi Gratis", "Parkir", "Restoran", "Kolam Renang"],
    rooms: [
      {
        id: 1,
        name: "Deluxe Twin",
        image: "/hotel/Roomcanggu-2.png",
        facilities: ["WiFi Gratis", "Shower", "AC"],
        status: "fully_booked",
        options: [
          {
            breakfast: false,
            bed: "2 single bed",
            refund: false,
            oldPrice: "Rp 466.831",
            price: "Rp 350.123",
            note: "Sisa 2 kamar!",
            capacity: 2,
          },
          {
            breakfast: true,
            bed: "2 single bed",
            refund: false,
            oldPrice: "Rp 653.563",
            price: "Rp 490.172",
            note: "Sisa 2 kamar!",
            capacity: 2,
          },
        ],
      },
      {
        id: 2,
        name: "Family",
        image: "/hotel/Roomcanggu-2.png",
        facilities: ["WiFi Gratis", "Shower", "AC", "Balkon"],
        status: "available",
        options: [
          {
            breakfast: false,
            bed: "2 double bed",
            refund: false,
            oldPrice: "Rp 653.563",
            price: "Rp 490.172",
            note: "Sisa 2 kamar!",
            capacity: 4,
          },
          {
            breakfast: true,
            bed: "2 double bed",
            refund: true,
            oldPrice: "Rp 750.000",
            price: "Rp 600.000",
            note: "Sisa 1 kamar!",
            capacity: 4,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    city: "Canggu",
    branch: "Inferno Hotel Canggu",
    address: "Jl. Batu Bolong No.99",
    rating: 3,
    status: "available",

    image: "/hotel/Roomcanggu-2.png",
    gallery: [
      "/canggu/canggu-1.png",
      "/canggu/canggu-2.png",
      "/canggu/canggu-3.png",
      "/canggu/canggu-4.png",
      "/canggu/canggu-5.png",
      "/canggu/canggu-6.png",
    ],
    galeryRooms: [
      { src: "/hotel/roomCanggu-1.png", alt: "Kamar Inferno Ubud kiri" },
      { src: "/hotel/roomCanggu-2.png", alt: "Kamar Inferno Ubud tengah" },
      { src: "/hotel/roomCanggu-3.png", alt: "Kamar Inferno Ubud kanan" },
    ],
    description:
      "Inferno Hotel Canggu menawarkan suasana modern dengan sentuhan tropis. Kamar dilengkapi balkon pribadi, AC, WiFi gratis, serta akses cepat ke pantai populer di Canggu.",
    facilities: ["WiFi Gratis", "Restoran", "AC", "Shuttle Bandara"],
    rooms: [
      {
        id: 1,
        name: "Superior Room",
        image: "/hotel/Roomcanggu-2.png",
        facilities: ["WiFi Gratis", "Shower", "AC"],
        status: "available",
        options: [
          {
            breakfast: false,
            bed: "1 double bed",
            refund: true,
            oldPrice: "Rp 500.000",
            price: "Rp 400.000",
            note: "Sisa 3 kamar!",
            capacity: 2,
          },
        ],
      },
      {
        id: 2,
        name: "Suite",
        image: "/hotel/Roomcanggu-2.png",
        facilities: ["WiFi Gratis", "Shower", "AC", "Balkon"],
        status: "available",
        options: [
          {
            breakfast: true,
            bed: "2 double bed",
            refund: true,
            oldPrice: "Rp 750.000",
            price: "Rp 600.000",
            note: "Sisa 1 kamar!",
            capacity: 3,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    city: "Kuta",
    branch: "Inferno Hotel Kuta",
    address: "Jl. Pantai Kuta No.8",
    rating: 5,
    status: "available",

    image: "/hotel/Roomcanggu-2.png",
    gallery: [
      "/canggu/canggu-1.png",
      "/canggu/canggu-2.png",
      "/canggu/canggu-3.png",
      "/canggu/canggu-4.png",
      "/canggu/canggu-5.png",
      "/canggu/canggu-6.png",
    ],
    galeryRooms: [
      { src: "/hotel/roomCanggu-1.png", alt: "Kamar Inferno Ubud kiri" },
      { src: "/hotel/roomCanggu-2.png", alt: "Kamar Inferno Ubud tengah" },
      { src: "/hotel/roomCanggu-3.png", alt: "Kamar Inferno Ubud kanan" },
    ],
    description:
      "Inferno Hotel Kuta berlokasi strategis dekat pantai Kuta. Dengan fasilitas modern, kolam renang, dan restoran, cocok untuk wisatawan yang ingin menikmati suasana ramai Bali.",
    facilities: ["WiFi Gratis", "Restoran", "AC"],
    rooms: [
      {
        id: 1,
        name: "Standard Room",
        image: "/hotel/Roomcanggu-2.png",
        facilities: ["WiFi Gratis", "Shower", "AC"],
        status: "available",
        options: [
          {
            breakfast: false,
            bed: "1 double bed",
            refund: false,
            oldPrice: "Rp 400.000",
            price: "Rp 300.000",
            note: "Sisa 5 kamar!",
            capacity: 2,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    city: "Seminyak",
    branch: "Inferno Hotel Seminyak",
    rating: 5,
    status: "available",

    address: "Jl. Kayu Aya No.12",
    image: "/hotel/Roomcanggu-2.png",
    gallery: [
      "/canggu/canggu-1.png",
      "/canggu/canggu-2.png",
      "/canggu/canggu-3.png",
      "/canggu/canggu-4.png",
      "/canggu/canggu-5.png",
      "/canggu/canggu-6.png",
    ],
    galeryRooms: [
      { src: "/hotel/roomCanggu-1.png", alt: "Kamar Inferno Ubud kiri" },
      { src: "/hotel/roomCanggu-2.png", alt: "Kamar Inferno Ubud tengah" },
      { src: "/hotel/roomCanggu-3.png", alt: "Kamar Inferno Ubud kanan" },
    ],
    description:
      "Inferno Hotel Seminyak menghadirkan pengalaman mewah dengan akses mudah ke pusat hiburan dan kuliner Seminyak. Ideal untuk liburan modern di Bali.",
    facilities: ["WiFi Gratis", "Spa", "Kolam Renang"],
    rooms: [
      {
        id: 1,
        name: "Deluxe Room",
        image: "/hotel/Roomcanggu-2.png",
        facilities: ["WiFi Gratis", "Shower", "AC"],
        status: "available",
        options: [
          {
            breakfast: true,
            bed: "1 king bed",
            refund: true,
            oldPrice: "Rp 700.000",
            price: "Rp 550.000",
            note: "Sisa 2 kamar!",
            capacity: 2,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    city: "Nusa Dua",
    branch: "Inferno Hotel Nusa Dua",
    address: "Jl. Nusa Dua Selatan No.88",
    rating: 5,
    status: "available",

    image: "/hotel/Roomcanggu-2.png",
    gallery: [
      "/canggu/canggu-1.png",
      "/canggu/canggu-2.png",
      "/canggu/canggu-3.png",
      "/canggu/canggu-4.png",
      "/canggu/canggu-5.png",
      "/canggu/canggu-6.png",
    ],
    galeryRooms: [
      { src: "/hotel/roomCanggu-1.png", alt: "Kamar Inferno Ubud kiri" },
      { src: "/hotel/roomCanggu-2.png", alt: "Kamar Inferno Ubud tengah" },
      { src: "/hotel/roomCanggu-3.png", alt: "Kamar Inferno Ubud kanan" },
    ],
    description:
      "Inferno Hotel Nusa Dua memberikan kemewahan dengan pantai pribadi dan fasilitas spa. Pilihan ideal untuk liburan santai di tepi laut.",
    facilities: ["Pantai Pribadi", "Spa", "Restoran"],
    rooms: [
      {
        id: 1,
        name: "Beachfront Suite",
        image: "/hotel/Roomcanggu-2.png",
        facilities: ["Pantai", "WiFi Gratis", "Shower", "AC"],
        status: "available",
        options: [
          {
            breakfast: true,
            bed: "1 king bed",
            refund: true,
            oldPrice: "Rp 1.200.000",
            price: "Rp 950.000",
            note: "Sisa 1 kamar!",
            capacity: 2,
          },
        ],
      },
    ],
  },
  {
    id: 6,
    city: "Sanur",
    branch: "Inferno Hotel Sanur",
    address: "Jl. Danau Tamblingan No.45",
    rating: 5,
    status: "available",

    image: "/hotel/Roomcanggu-2.png",
    gallery: [
      "/canggu/canggu-1.png",
      "/canggu/canggu-2.png",
      "/canggu/canggu-3.png",
      "/canggu/canggu-4.png",
      "/canggu/canggu-5.png",
      "/canggu/canggu-6.png",
    ],
    galeryRooms: [
      { src: "/hotel/roomCanggu-1.png", alt: "Kamar Inferno Ubud kiri" },
      { src: "/hotel/roomCanggu-2.png", alt: "Kamar Inferno Ubud tengah" },
      { src: "/hotel/roomCanggu-3.png", alt: "Kamar Inferno Ubud kanan" },
    ],
    description:
      "Inferno Hotel Sanur menyajikan suasana pantai yang tenang dengan akses langsung ke laut. Dilengkapi kolam renang dan restoran dengan hidangan laut segar.",
    facilities: ["WiFi Gratis", "Restoran", "Kolam Renang"],
    rooms: [
      {
        id: 1,
        name: "Superior Room",
        image: "/hotel/Roomcanggu-2.png",
        facilities: ["WiFi Gratis", "Shower", "AC"],
        status: "available",
        options: [
          {
            breakfast: false,
            bed: "2 single bed",
            refund: false,
            oldPrice: "Rp 550.000",
            price: "Rp 420.000",
            note: "Sisa 2 kamar!",
            capacity: 2,
          },
        ],
      },
    ],
  },
  {
    id: 7,
    city: "Jimbaran",
    branch: "Inferno Hotel Jimbaran",
    address: "Jl. Uluwatu II No.33",
    rating: 5,
    status: "available",

    image: "/hotel/Roomcanggu-2.png",
    gallery: [
      "/canggu/canggu-1.png",
      "/canggu/canggu-2.png",
      "/canggu/canggu-3.png",
      "/canggu/canggu-4.png",
      "/canggu/canggu-5.png",
      "/canggu/canggu-6.png",
    ],
    galeryRooms: [
      { src: "/hotel/roomCanggu-1.png", alt: "Kamar Inferno Ubud kiri" },
      { src: "/hotel/roomCanggu-2.png", alt: "Kamar Inferno Ubud tengah" },
      { src: "/hotel/roomCanggu-3.png", alt: "Kamar Inferno Ubud kanan" },
    ],
    description:
      "Inferno Hotel Jimbaran menyuguhkan panorama laut dengan kamar ber-AC dan akses pantai pribadi. Tempat sempurna untuk menikmati sunset Bali.",
    facilities: ["WiFi Gratis", "Pantai", "AC"],
    rooms: [
      {
        id: 1,
        name: "Sea View Room",
        image: "/hotel/Roomcanggu-2.png",
        facilities: ["WiFi Gratis", "Pantai", "AC"],
        status: "available",
        options: [
          {
            breakfast: true,
            bed: "1 double bed",
            refund: true,
            oldPrice: "Rp 800.000",
            price: "Rp 650.000",
            note: "Sisa 2 kamar!",
            capacity: 2,
          },
        ],
      },
    ],
  },
  {
    id: 8,
    city: "Legian",
    branch: "Inferno Hotel Legian",
    address: "Jl. Legian Raya No.5",
    rating: 5,
    status: "available",

    image: "/hotel/Roomcanggu-2.png",
    gallery: [
      "/canggu/canggu-1.png",
      "/canggu/canggu-2.png",
      "/canggu/canggu-3.png",
      "/canggu/canggu-4.png",
      "/canggu/canggu-5.png",
      "/canggu/canggu-6.png",
    ],
    galeryRooms: [
      { src: "/hotel/roomCanggu-1.png", alt: "Kamar Inferno Ubud kiri" },
      { src: "/hotel/roomCanggu-2.png", alt: "Kamar Inferno Ubud tengah" },
      { src: "/hotel/roomCanggu-3.png", alt: "Kamar Inferno Ubud kanan" },
    ],
    description:
      "Inferno Hotel Legian berada di jantung hiburan Bali. Dengan bar, kolam renang, dan akses mudah ke pusat belanja, sangat cocok untuk wisatawan muda.",
    facilities: ["WiFi Gratis", "Bar", "Kolam Renang"],
    rooms: [
      {
        id: 1,
        name: "Deluxe Room",
        image: "/hotel/Roomcanggu-2.png",
        facilities: ["WiFi Gratis", "Shower", "AC"],
        status: "available",
        options: [
          {
            breakfast: false,
            bed: "1 double bed",
            refund: true,
            oldPrice: "Rp 600.000",
            price: "Rp 480.000",
            note: "Sisa 4 kamar!",
            capacity: 2,
          },
        ],
      },
    ],
  },
  {
    id: 9,
    city: "Nusa Penida",
    branch: "Inferno Hotel Nusa Penida",
    rating: 5,
    status: "available",

    address: "Jl. Ped No.7",
    image: "/hotel/Roomcanggu-2.png",
    gallery: [
      "/canggu/canggu-1.png",
      "/canggu/canggu-2.png",
      "/canggu/canggu-3.png",
      "/canggu/canggu-4.png",
      "/canggu/canggu-5.png",
      "/canggu/canggu-6.png",
    ],
    galeryRooms: [
      { src: "/hotel/roomCanggu-1.png", alt: "Kamar Inferno Ubud kiri" },
      { src: "/hotel/roomCanggu-2.png", alt: "Kamar Inferno Ubud tengah" },
      { src: "/hotel/roomCanggu-3.png", alt: "Kamar Inferno Ubud kanan" },
    ],
    description:
      "Inferno Hotel Nusa Penida menawarkan pengalaman pulau tropis dengan fasilitas modern. Nikmati pemandangan laut biru dan akses mudah ke spot snorkeling.",
    facilities: ["WiFi Gratis", "Pantai", "Shuttle Kapal"],
    rooms: [
      {
        id: 1,
        name: "Island Suite",
        image: "/hotel/Roomcanggu-2.png",
        facilities: ["Pantai", "WiFi Gratis", "AC"],
        status: "available",
        options: [
          {
            breakfast: true,
            bed: "1 king bed",
            refund: false,
            oldPrice: "Rp 900.000",
            price: "Rp 750.000",
            note: "Sisa 2 kamar!",
            capacity: 2,
          },
        ],
      },
    ],
  },
  {
    id: 10,
    city: "Uluwatu",
    branch: "Inferno Hotel Uluwatu",
    address: "Jl. Labuan Sait No.88",
    rating: 5,
    status: "available",

    image: "/hotel/Roomcanggu-2.png",
    gallery: [
      "/canggu/canggu-1.png",
      "/canggu/canggu-2.png",
      "/canggu/canggu-3.png",
      "/canggu/canggu-4.png",
      "/canggu/canggu-5.png",
      "/canggu/canggu-6.png",
    ],
    galeryRooms: [
      { src: "/hotel/roomCanggu-1.png", alt: "Kamar Inferno Ubud kiri" },
      { src: "/hotel/roomCanggu-2.png", alt: "Kamar Inferno Ubud tengah" },
      { src: "/hotel/roomCanggu-3.png", alt: "Kamar Inferno Ubud kanan" },
    ],
    description:
      "Inferno Hotel Uluwatu berdiri di tebing dengan pemandangan spektakuler. Ideal untuk pasangan atau traveler yang mencari ketenangan dengan sentuhan mewah.",
    facilities: ["Pantai", "Spa", "WiFi Gratis"],
    rooms: [
      {
        id: 1,
        name: "Cliff Suite",
        image: "/hotel/Roomcanggu-2.png",
        facilities: ["Pantai", "WiFi Gratis", "Shower", "AC"],
        status: "available",
        options: [
          {
            breakfast: true,
            bed: "1 king bed",
            refund: true,
            oldPrice: "Rp 1.500.000",
            price: "Rp 1.200.000",
            note: "Sisa 1 kamar!",
            capacity: 2,
          },
        ],
      },
    ],
  },
];
