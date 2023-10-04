import React from "react";
import { Card } from "react-bootstrap";
import styles from "./StarRatingCard.module.scss";

function CardFront({ children, title }) {
  return (
    <Card
      className={`${styles["top-30"]} ${styles["mb-32"]} ${styles["px-32"]} ${styles["cta_right_card-side"]} ${styles["cta_right_card-front"]} start-0 mb-md-0  py-4 py-sm-5 bg-light border border-2 border-secondary `}
    >
      <Card.Title className="text-secondary fw-bold text-center">
        {title}
      </Card.Title>
      {children}
    </Card>
  );
}

export default CardFront;
