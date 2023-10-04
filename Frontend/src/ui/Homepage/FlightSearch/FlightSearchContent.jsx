import React from "react";
import styles from "./FlightSearchSection.module.scss";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import SectionHeader from "../SectionHeader";
import { Link } from "react-router-dom";

function FlightSearchContent() {
  return (
    <Col lg={5} className="px-0 pe-lg-4">
      <div
        className={`border border-primary p-3 ${styles["bg-size-256"]} ${styles["bg-pos-120-150"]}  mb-0 h-100`}
        style={{
          backgroundImage: "url(/images/homepage/inspection.png)",
        }}
      >
        <SectionHeader
          number={"01"}
          title="Real-Time Flight Delay Tracking"
          description="Your Gateway to Timely Travel Updates"
        ></SectionHeader>

        <div className={`text-center ${styles["mt-40"]} `}>
          <p className={`fs-6  `}>
            We offer the latest details on delayed flights, ensuring you have
            up-to-the-minute information for smoother, hassle-free travels.
          </p>
          <Link to="/delayedFlights">
            <Button
              variant="warning"
              className={`fw-bold text-secondary rounded-0 h5 mb-0 ${styles["py-12"]} px-4`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Inquire
            </Button>
          </Link>
        </div>
      </div>
    </Col>
  );
}

export default FlightSearchContent;
