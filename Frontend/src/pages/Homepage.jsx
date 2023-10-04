import React from "react";
import HeroSection from "../ui/Homepage/HeroSection";
import FlightSearchSection from "../ui/Homepage/FlightSearch/FlightSearchSection";
import RealTimeFlightSection from "../ui/Homepage/RealTimeFlight/RealTimeFlightSection";
import NearAirportSection from "../ui/Homepage/NearAirportSection";
import HotSpots from "../ui/Homepage/HotSpots/HotSpots";
import CTA from "../ui/Homepage/CTA/CTA";

function Homepage() {
  return (
    <main>
      <HeroSection />

      <section className={`py-5`}>
        <FlightSearchSection />
        <RealTimeFlightSection />
      </section>

      <NearAirportSection></NearAirportSection>
      <HotSpots></HotSpots>
      <CTA></CTA>
    </main>
  );
}

export default Homepage;
