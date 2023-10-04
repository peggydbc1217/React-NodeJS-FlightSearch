import { Container, Row, Col, Button } from "react-bootstrap";
import React from "react";
import styles from "./RealTimeFlightSection.module.scss";
import SectionHeader from "../SectionHeader";
import { Link } from "react-router-dom";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function RealTimeFlightSection() {
  return (
    <Container className="overflow-hidden px-3 mt-5">
      <Row
        className="gx-4 row-cols-1 row-cols-lg-12"
        data-aos="fade-left"
        data-aos-offset="-200"
        data-aos-delay="0"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
        data-aos-anchor-placement="top-center"
      >
        <Col lg={6} className={`px-0 pe-lg-4  mt-lg-0 order-lg-1 order-2`}>
          <div className="">
            <LazyLoadImage
              className={`${styles["flightSearch-img-rwd-height-2"]}`}
              src="/images/homepage/realTime.jpg"
              alt="realTime"
              effect="blur"
              placeholderSrc="/images/homepage/realTime-low.jpg"
              width={"100%"}
            ></LazyLoadImage>
            {/* <img
              className={`w-100 ${styles["flightSearch-img-rwd-height-2"]}`}
              src="/images/homepage/realTime.jfif"
              alt="realTime"
            /> */}
          </div>
        </Col>
        <Col lg={6} className="px-0 pe-lg-4 order-lg-2 order-1">
          <div
            className={`border border-primary p-3 ms-0 ${styles["bg-size-256"]} ${styles["bg-pos-120-150"]} h-100`}
            style={{
              backgroundImage: "url(/images/homepage/inspection.png)",
            }}
          >
            <SectionHeader
              number={"02"}
              title="Flight Coordinate Inquiry"
              description="Tracking Miracles in the Sky! Discover Aircraft Positions
          Instantly"
            ></SectionHeader>

            <div className={`text-center ${styles["mt-40"]}`}>
              <p className={`fs-6 ${styles["mb-90"]}"`}>
                Stay together with your loved ones, always guarding! Explore our
                services, inquire about the flight status of family and friends,
                ensure their safety, and share the beauty and excitement of the
                journey together!
              </p>
              <Link to="/realTimeFlight">
                <Button
                  variant="warning"
                  className={`fw-bold text-secondary rounded-0 h5 mb-0 ${styles["py-12"]} px-4`}
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  Guard Now
                </Button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default RealTimeFlightSection;
