import React from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import SectionHeader from "../SectionHeader";

function HotSpotTitle() {
  return (
    <Row className="d-flex">
      <Col className="me-2 d-flex align-items-center">
        <SectionHeader
          number={"03"}
          title="Popular Destinations"
          description="Discover Recommended Travel Destinations"
        ></SectionHeader>
      </Col>
    </Row>
  );
}

export default HotSpotTitle;
