import React from "react";
import { Container, Button } from "react-bootstrap";
import "aos/dist/aos.css";
import AOS from "aos";
import styles from "./NearAirportSection.module.scss";
import { Link } from "react-router-dom";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import useLazyBackgroundImg from "../../CustomHook/useLazyBackgroundImg";

function NearAirportSection() {
  const loaded = useLazyBackgroundImg("/images/homepage/nearAirport.jpg");

  return (
    <LazyLoadComponent>
      <section
        className={`${styles["nearAirport-clip-path"]} ${styles["img-height-setting"]}  ${styles["bg-cover"]}   ${styles["nearAirport-bg-pos"]}  container-fluid pe-0 mt-0 px-lg-0`}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${
            loaded || "/images/homepage/nearAirport-low.jpg"
          })`,
          filter: `${loaded ? "none" : "blur(10px)"}`,
        }}
        data-aos="fade-up"
        data-aos-offset="-200"
        data-aos-delay="0"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
        data-aos-anchor-placement="top-center"
      >
        <Container
          className={`text-center ${styles["nearAirport-container-pt"]}`}
        >
          <h2 className={`text-light fw-bold ${styles["rfs-80"]} `}>
            Discover Limitless Possibilities!
          </h2>
          <p className="text-light fs-3 mt-4">
            Explore Infinite Possibilities, Find Travel Inspiration.
          </p>
          <p className="text-light fs-3 mt-2">
            When uncertainty strikes, our nearby airport services will lead you
            to your dream escape.
          </p>
        </Container>
        <Container className="text-center">
          {/* <!-- Remember to add the link --> */}
          <Link to="/nearAirports?distance=100&lat=24.8&lng=121.1">
            <Button
              variant="warning"
              className={`h5 text-secondary rounded-0 fw-bold ${styles["nearAirport-btn-mt"]} px-4 py-2 ${styles["btn-hover"]}`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Discover Nearby Airports
            </Button>
          </Link>
        </Container>
      </section>
    </LazyLoadComponent>
  );
}

export default NearAirportSection;
