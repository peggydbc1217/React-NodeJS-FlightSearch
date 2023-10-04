import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./Spacer.module.scss";

function Spacer() {
  return (
    <>
      <Row className={`mt-3 justify-content-center justify-content-lg-start`}>
        <Col xs={9}>
          <div className={`${styles["spacer"]}`}></div>
        </Col>
      </Row>
    </>
  );
}

export default Spacer;
