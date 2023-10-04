import React from "react";
import styles from "./HotSpotsCardList.module.scss";

function CardItemBottom({ duration, airlines, seatsLeft, price }) {
  return (
    <div className={` d-flex justify-content-end gap-4`}>
      <ul className={`list-unstyled ${styles["mt-32"]}`}>
        <li className="mb-2">
          <p className="m-0 text-end fw-bold">From TPE</p>
        </li>
        <li className="mb-2">
          <p className="m-0 text-end fw-bold">Airlines</p>
        </li>
        <li className="mb-2">
          <p className="m-0 text-end fw-bold">Seats</p>
        </li>
        <li className="mb-2">
          <p className="m-0 text-end fw-bold">Price</p>
        </li>
      </ul>

      <ul className={`list-unstyled ${styles["mt-32"]}`}>
        <li className="mb-2">
          <p className="fs-6 m-0">{duration}</p>
        </li>
        <li className="mb-2">
          <p className="fs-6 m-0">{airlines}</p>
        </li>
        <li className="mb-2">
          <p className="fs-6 m-0">{seatsLeft}</p>
        </li>
        <li className="mb-2">
          <p className="fs-6 m-0">{price}</p>
        </li>
      </ul>
    </div>
  );
}

export default CardItemBottom;
