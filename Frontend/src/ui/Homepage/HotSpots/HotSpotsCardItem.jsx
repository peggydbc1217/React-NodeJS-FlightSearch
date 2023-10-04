import React from "react";
import { Col } from "react-bootstrap";
import styles from "./HotSpotsCardList.module.scss";
import CardItemTop from "./CardItemTop";
import CardItemBottom from "./CardItemBottom";

function HotSpotsCardItem(props) {
  const { image, title, stars, duration, airlines, seatsLeft, price } = props;

  return (
    <Col className={`col-4 ${styles["card-hover-spot"]}`}>
      <CardItemTop image={image} title={title} stars={stars}></CardItemTop>
      <CardItemBottom
        duration={duration}
        airlines={airlines}
        seatsLeft={seatsLeft}
        price={price}
      ></CardItemBottom>
    </Col>
  );
}

export default HotSpotsCardItem;
