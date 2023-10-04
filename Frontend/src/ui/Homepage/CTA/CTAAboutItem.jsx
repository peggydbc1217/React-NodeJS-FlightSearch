import React from "react";
import styles from "./CTAAbout.module.scss";

function CTAAboutItem({ title, description, imageName }) {
  return (
    <li
      className={`d-flex align-items-center flex-column flex-md-row gap-4 ${styles["mt-72"]} ${styles["mb-32"]} `}
    >
      <div
        className={`${styles["bg-cover"]} ${styles["bg-size-90"]}  bg-secondary rounded-circle`}
        style={{
          height: "96px",
          width: "96px",
          backgroundImage: `url(/images/homepage/${imageName}.png)`,
        }}
      ></div>
      <div
        className={`${styles["cta-left-textAlign"]} ${styles["cta-left-width"]}`}
      >
        <h5 className={`mb-3 fw-bold text-secondary`}>{title}</h5>
        <p className={`fs-6`}>{description}</p>
      </div>
    </li>
  );
}

export default CTAAboutItem;
