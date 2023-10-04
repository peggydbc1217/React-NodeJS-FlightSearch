import React from "react";
import styles from "./Custom.module.scss";

function FeatureHeader({ title }) {
  return (
    <p
      className={`text-secondary text-center fw-bold ${styles["ls-10"]} ${styles["rfs-80"]}`}
    >
      {title}
    </p>
  );
}

export default FeatureHeader;
