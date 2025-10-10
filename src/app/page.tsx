"use client";

import Navbar from "./components/Navbar";
import Hero from "./home/components/Hero";
import About from "./home/components/About";
import Hotel from "./home/components/Hotel";
import Ulasan from "./home/components/ulasan";
import GoogleMapHotels from "./components/map";
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
      <FooterSection />
    </div>
  );
}
