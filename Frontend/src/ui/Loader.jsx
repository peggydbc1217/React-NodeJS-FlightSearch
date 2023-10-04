import React from "react";
import styles from "./Loader.module.scss";

function Loader() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default Loader;
