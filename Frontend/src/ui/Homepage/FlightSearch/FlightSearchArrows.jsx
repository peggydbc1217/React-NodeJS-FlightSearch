import React from "react";
import { Button } from "react-bootstrap";
import styles from "./FlightSearchArrows.module.scss";

function FlightSearchArrows({ onClickNext, onClickPrev }) {
  return (
    <>
      <div
        className={`position-absolute ${styles["flightSearch-arrow-position"]} z-1 d-flex`}
      >
        <Button
          href="#"
          variant="warning"
          className={`rounded-0 p-0 d-block ${styles["carousel-hover"]}`}
          onClick={onClickPrev}
        >
          <img
            src="/images/homepage/Arrow Pointing Left.png"
            alt="arrow_left"
          />
        </Button>

        <Button
          href="#"
          variant="warning"
          className={`rounded-0 p-0 d-block ${styles["carousel-hover"]}`}
          onClick={onClickNext}
        >
          <img src="/images/homepage/Right Arrow.png" alt="arrow_right" />
        </Button>
      </div>
    </>
  );
}

export default FlightSearchArrows;
