"use client";

import Navbar from "./components/Navbar";
import Hero from "./home/Hero";
import About from "./home/About";
import Hotel from "./home/Hotel";
import Ulasan from "./home/ulasan";
import GoogleMapHotels from "./components/map";
import HotelList from "./api/hotels/route";
import FooterSection from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Hotel />
      <GoogleMapHotels />
      <Ulasan />
      <HotelList />
      <FooterSection />
    </div>
  );
}
