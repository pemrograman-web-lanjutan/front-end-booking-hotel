"use client";

import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState } from "react";
import { RoomsHotels } from "../data/cabang";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: -8.65,
  lng: 115.22,
};

export default function GoogleMapHotels() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="bg-[var(--primary)]">
      <div className="p-20 my-20">
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}>
            {RoomsHotels.map((hotel) => (
              <Marker
                key={hotel.id}
                position={{ lat: hotel.lat, lng: hotel.lng }}
                onClick={() => setSelected(hotel.id)}
              />
            ))}

            {selected && (
              <InfoWindow
                position={{
                  lat:
                    RoomsHotels.find((h) => h.id === selected)?.lat ||
                    center.lat,
                  lng:
                    RoomsHotels.find((h) => h.id === selected)?.lng ||
                    center.lng,
                }}
                onCloseClick={() => setSelected(null)}>
                <div>
                  <h3 className="font-bold">
                    {RoomsHotels.find((h) => h.id === selected)?.branch}
                  </h3>
                  <p>{RoomsHotels.find((h) => h.id === selected)?.city}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}
