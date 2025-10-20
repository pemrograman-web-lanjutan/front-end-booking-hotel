// "use client";

// import {
//   GoogleMap,
//   LoadScript,
//   Marker,
//   InfoWindow,
// } from "@react-google-maps/api";
// import { useState, useEffect } from "react";

// export default function GoogleMapHotels() {
//   const [selected, setSelected] = useState<number | null>(null);
//   const [mapHeight, setMapHeight] = useState("400px"); // default mobile

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) setMapHeight("600px");
//       else if (window.innerWidth >= 640) setMapHeight("500px");
//       else setMapHeight("350px");
//     };

//     handleResize(); // jalankan sekali saat mount
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const containerStyle = {
//     width: "100%",
//     height: mapHeight,
//   };

//   const center = {
//     lat: -8.65,
//     lng: 115.22,
//   };

//   return (
//     <div className="bg-[var(--primary)]">
//       <div className="px-4 py-10 sm:px-8 md:px-16 lg:px-20 lg:py-20 my-10 sm:my-16 lg:my-20">
//         <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}>
//           <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={center}
//             zoom={10}>
//             {RoomsHotels.map((hotel) => (
//               <Marker
//                 key={hotel.id}
//                 position={{ lat: hotel.lat, lng: hotel.lng }}
//                 onClick={() => setSelected(hotel.id)}
//               />
//             ))}

//             {selected && (
//               <InfoWindow
//                 position={{
//                   lat:
//                     RoomsHotels.find((h) => h.id === selected)?.lat ||
//                     center.lat,
//                   lng:
//                     RoomsHotels.find((h) => h.id === selected)?.lng ||
//                     center.lng,
//                 }}
//                 onCloseClick={() => setSelected(null)}>
//                 <div className="text-sm sm:text-base">
//                   <h3 className="font-bold">
//                     {RoomsHotels.find((h) => h.id === selected)?.branch}
//                   </h3>
//                   <p>{RoomsHotels.find((h) => h.id === selected)?.city}</p>
//                 </div>
//               </InfoWindow>
//             )}
//           </GoogleMap>
//         </LoadScript>
//       </div>
//     </div>
//   );
// }
