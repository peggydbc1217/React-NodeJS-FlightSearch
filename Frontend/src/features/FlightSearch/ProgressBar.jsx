import React from "react";
import { Row } from "react-bootstrap";
import styles from "./ProgressBar.module.scss";
import ProgressBarItem from "./ProgressBarItem";

const ProgressBarArray = [
  " Search",
  "View ",
  "Fill ",
  // "Confirm ",
  " Finished",
];

function ProgressBar({ activePage }) {
  return (
    <Row className="d-flex mt-5 mb-5 justify-content-center mx-0">
      <div
        className={`${styles["progress-bar"]}  d-flex justify-content-center  position-relative gap-sm-5 gap-1`}
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(/images/homepage/bg.png)",
        }}
      >
        {ProgressBarArray.map((title, index) => {
          let isActive = false;
          if (index === activePage - 1) isActive = true;
          // 記得來改掉
          return (
            <ProgressBarItem
              number={index + 1}
              title={title}
              isActive={isActive}
              key={title}
            />
          );
        })}
      </div>
      {/* <hr className={`${styles["progress-bar-hr"]} position-absolute`}></hr> */}
    </Row>
  );
}

export default ProgressBar;
