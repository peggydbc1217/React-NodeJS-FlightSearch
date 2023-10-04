import { Container, Row } from "react-bootstrap";
import React from "react";
import FlightSearchContent from "./FlightSearchContent";
import FlightSearchCarousel from "./FlightSearchCarousel";

function FlightSearchSection() {
  return (
    <Container
      className="px-3"
      data-aos="fade-right"
      data-aos-offset="-200"
      data-aos-delay="0"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
    >
      <Row className="gx-4 row-cols-1 row-cols-lg-12 mb-6">
        <FlightSearchContent></FlightSearchContent>
        <FlightSearchCarousel></FlightSearchCarousel>
      </Row>
    </Container>
  );
}

export default FlightSearchSection;
