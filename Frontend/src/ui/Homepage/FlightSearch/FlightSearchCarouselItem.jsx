import React from "react";
import styles from "./FlightSearchCarouselItem.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function FlightSearchCarouselItem({ imageName, isActive }) {
  const lqipImageName = imageName.split(".")[0] + "-low.jpg";

  return (
    <li
      className={`${styles["w-80"]} ${styles["translateX-85n"]} ${
        isActive ? styles["carousel-item-active"] : styles["carousel-item"]
      } `}
    >
      <LazyLoadImage
        alt={`${imageName}`}
        className={`w-100 ${styles["flightSearch-img-rwd-height"]}`}
        src={`/images/homepage/${imageName}`}
        effect="blur"
        width={"100%"}
        placeholderSrc={`/images/homepage/${lqipImageName}`}
        // <img
        //   className={`w-100 ${styles["flightSearch-img-rwd-height"]}`}
        //   src={`/images/homepage/${imageName}`}
        //   alt={`${imageName}`}
      />
    </li>
  );
}

export default FlightSearchCarouselItem;
