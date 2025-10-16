"use client";

import Navbar from "./components/Navbar";
import Hero from "./home/Hero";
import About from "./home/About";
import Hotel from "./home/Hotel";
import FormUlasan from "./home/FormUlasan";
import GoogleMapHotels from "./home/map";
import HotelList from "./api/hotels/route";
import FooterSection from "./home/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Hotel />
      <GoogleMapHotels />
      <FormUlasan />
      <HotelList />
      <FooterSection />
    </div>
  );
}
