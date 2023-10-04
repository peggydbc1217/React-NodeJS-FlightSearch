import { Col } from "react-bootstrap";
import CardFront from "./CardFront";
import CardFrontContent from "./CardFrontContent";
import CardBack from "./CardBack";
import CardBackContent from "./CardBackContent";
import styles from "./StarRatingCard.module.scss";

function StarRatingCard() {
  return (
    <Col className={`${styles["cta_right_card"]} col px-0`}>
      <CardFront title="What We Offer">
        <CardFrontContent></CardFrontContent>
      </CardFront>

      <CardBack title="Not a Member Yet?">
        <CardBackContent></CardBackContent>
      </CardBack>
    </Col>
  );
}

export default StarRatingCard;
