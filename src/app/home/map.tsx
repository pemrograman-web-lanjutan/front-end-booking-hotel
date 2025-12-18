"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

/* =========================
   TYPES
========================= */
interface Location {
  id: number;
  name: string;
  position: { lat: number; lng: number };
}

/* =========================
   FIX LEAFLET ICON (Next.js)
========================= */
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* =========================
   FIX MAP RESIZE (WAJIB)
========================= */
function FixMapSize() {
  const map = useMap();

  useEffect(() => {
    // Delay sedikit agar layout benar-benar siap
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }, [map]);

  return null;
}

/* =========================
   MAIN COMPONENT
========================= */
export default function LeafletMapHotels() {
  const [mapHeight, setMapHeight] = useState("400px");

  /* Responsive height */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMapHeight("600px");
      else if (window.innerWidth >= 640) setMapHeight("500px");
      else setMapHeight("350px");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Data lokasi */
  const locations: Location[] = [
    {
      id: 1,
      name: "Hotel Inferno Denpasar",
      position: { lat: -8.6705, lng: 115.2126 },
    },
    {
      id: 2,
      name: "Hotel Inferno Badung",
      position: { lat: -8.5817, lng: 115.177 },
    },
    {
      id: 3,
      name: "Hotel Inferno Gianyar",
      position: { lat: -8.5445, lng: 115.3255 },
    },
    {
      id: 4,
      name: "Hotel Inferno Buleleng",
      position: { lat: -8.112, lng: 115.0919 },
    },
    {
      id: 5,
      name: "Hotel Inferno Karangasem",
      position: { lat: -8.45, lng: 115.613 },
    },
    {
      id: 6,
      name: "Hotel Inferno Tabanan",
      position: { lat: -8.541, lng: 115.126 },
    },
    {
      id: 7,
      name: "Hotel Inferno Jembrana",
      position: { lat: -8.3721, lng: 114.6418 },
    },
    {
      id: 8,
      name: "Hotel Inferno Klungkung",
      position: { lat: -8.5416, lng: 115.4055 },
    },
    {
      id: 9,
      name: "Hotel Inferno Nusa Penida",
      position: { lat: -8.7277, lng: 115.5444 },
    },
    {
      id: 10,
      name: "Hotel Inferno Canggu",
      position: { lat: -8.6478, lng: 115.1385 },
    },
    {
      id: 11,
      name: "Hotel Inferno Ubud",
      position: { lat: -8.5069, lng: 115.2625 },
    },
  ];

  return (
    <div className="bg-[var(--primary)]">
      <div className="px-4 py-10 sm:px-8 md:px-16 lg:px-20">
        <MapContainer
          center={[-8.45, 115.15]}
          zoom={9}
          style={{ width: "100%", height: mapHeight }}>
          {/* WAJIB: Fix ukuran map */}
          <FixMapSize />

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {locations.map((loc) => (
            <Marker
              key={loc.id}
              position={[loc.position.lat, loc.position.lng]}>
              <Popup>
                <div className="text-sm">
                  <h3 className="font-semibold text-[var(--primary)]">
                    {loc.name}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {loc.name.replace("Hotel Inferno ", "")}, Bali
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
