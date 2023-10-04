import React from "react";
import styles from "./SectionHeader.module.scss";

function SectionHeader({ number, title, description }) {
  return (
    <div className="d-flex">
      <h5
        className={`text-primary fw-bold me-2 ${styles["rotate-90"]}`}
        style={{ height: "20px" }}
      >
        {number}
      </h5>
      <div
        className={`${styles["border-left-2"]} d-flex flex-column justify-content-between  ps-2`}
      >
        <h4 className="text-secondary fw-bold mb-0">{title}</h4>
        <h5 className={`text-secondary fw-bold ${styles["opacity-85"]} mb-0`}>
          {description}
        </h5>
      </div>
    </div>
  );
}

export default SectionHeader;
