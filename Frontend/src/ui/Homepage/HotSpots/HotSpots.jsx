import React from "react";
import styles from "./HotSpots.module.scss";
import { Container } from "react-bootstrap";
import HotSpotsCardList from "./HotSpotsCardList";
import HotSpotTitle from "./HotSpotTitle";

function HotSpots() {
  return (
    <section
      className={` ${styles["card-scroll-rwd"]} ${styles["px-12"]} ${styles["py-32"]} ${styles["my-6"]} `}
      data-aos="zoom-in"
      data-aos-offset="-200"
      data-aos-delay="0"
      data-aos-duration="800"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
    >
      <Container>
        <HotSpotTitle></HotSpotTitle>
        {/* <!-- CARDS --> */}
        <HotSpotsCardList></HotSpotsCardList>
      </Container>
    </section>
  );
}

export default HotSpots;
