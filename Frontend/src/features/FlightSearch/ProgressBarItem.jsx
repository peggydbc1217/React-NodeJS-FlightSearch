import React from "react";
import { Col } from "react-bootstrap";
import styles from "./ProgressBar.module.scss";

function ProgressBarItem({ number, title, isActive = false }) {
  return (
    <Col sm={2} className="d-flex flex-column align-items-center ">
      <div className={`  d-flex flex-column `}>
        <button
          className={`fs-5 fw-bold m-auto text-secondary ${
            isActive ? "bg-primary" : styles["bg-deActive"]
          }  rounded-circle`}
        >
          {number}
        </button>
      </div>
      <p
        className={`${styles["progress-bar-label"]}  mt-2 d-inline-block text-secondary w-md-100 text-center mb-0 mb-sm-3 `}
      >
        {title}
      </p>
    </Col>
  );
}

export default ProgressBarItem;
