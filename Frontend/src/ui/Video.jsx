import React from "react";
import styles from "./Video.module.scss";

function Video({ srcMp4, srcWebm }) {
  return (
    <div className={`${styles["bg-video"]} px-0`}>
      <video className={`${styles["bg-video__content"]}`} autoPlay muted loop>
        <source src={srcMp4} type="video/mp4" />
        <source src={srcWebm} type="video/webm" />
        Your browser is not supported!
      </video>
    </div>
  );
}

export default Video;
