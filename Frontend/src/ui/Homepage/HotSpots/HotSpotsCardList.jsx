import React from "react";
import HotSpotsCardItem from "./HotSpotsCardItem";
import styles from "./HotSpotsCardList.module.scss";

function HotSpotsCardList() {
  return (
    <div
      className={`${styles["mt-32"]} ${styles["mt-lg-6"]} ${styles["card-hover"]} ${styles["card-scroll-width-rwd"]} row px-0 mx-0    `}
    >
      <HotSpotsCardItem
        image="/images/homepage/bangkok.jpg"
        title="Bangkok"
        stars={4}
        duration="3 hours 30 minutes"
        airlines="Multiple"
        seatsLeft="Many"
        price="Cheap"
      ></HotSpotsCardItem>
      <HotSpotsCardItem
        image="/images/homepage/tokyo.jpg"
        title="Tokyo"
        stars={4}
        duration="3 hours 30 minutes"
        airlines="Multiple"
        seatsLeft="Moderate"
        price="Cheap"
      ></HotSpotsCardItem>
      <HotSpotsCardItem
        image="/images/homepage/seoul.jpg"
        title="Seoul"
        stars={3}
        duration="3 hours 30 minutes"
        airlines="Many"
        seatsLeft="Many"
        price="Cheap"
      ></HotSpotsCardItem>
    </div>
  );
}

export default HotSpotsCardList;
