import React from "react";
import { Card } from "react-bootstrap";
import styles from "./StarRatingCard.module.scss";

function CardBack({ children, title }) {
  return (
    <Card
      className={`${styles["mb-32"]} ${styles["px-32"]} ${styles["cta_right_card-side"]} ${styles["cta_right_card-back"]} mb-md-0 py-4 py-sm-5 bg-light border border-2 border-secondary  text-center`}
    >
      <Card.Title className="fw-bold">{title}</Card.Title>
      {children}
    </Card>
  );
}

export default CardBack;
