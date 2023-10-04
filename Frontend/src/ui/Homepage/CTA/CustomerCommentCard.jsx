import React from "react";
import { Col, Image, ListGroup } from "react-bootstrap";
import styles from "./CustomerCommentCard.module.scss";

function CustomerCommentCard() {
  return (
    <Col
      md={8}
      className={`d-flex flex-column align-items-center bg-secondary ${styles["py-32"]} py-md-5`}
    >
      <div className={`${styles["img-caption"]} position-relative `}>
        <div
          className={`${styles["bg-cover"]} rounded-circle mb-2 ${styles["img-caption-img"]}`}
          style={{
            backgroundImage: `url(/images/homepage/avatar.jpg)`,
          }}
        ></div>
        <p
          className={`m-0 fs-5 fw-bold text-light ${styles["img-caption-filter"]}`}
        >
          Great Review!
        </p>
      </div>

      <p className={`m-0 fs-5 text-primary mb-4 text-white`}>Mei-Lan Lin</p>
      <p className={`m-0 text-white mb-2`}>Exceptional Experience</p>
      <h5 className={`fw-bold text-white mb-4 `}>Will Definitely Return</h5>

      {/* ///////////////////////////////////////////////*/}
      <ListGroup className={`pt-4 pt-md-5 border-top-primary list-unstyled`}>
        <ListGroup.Item
          className={`d-flex gap-2 align-items-center mb-3 bg-secondary border-0`}
        >
          <Image
            style={{ height: "28px" }}
            src="/images/homepage/verified.png"
            alt="verified"
          />
          <h4 className={`text-white fw-bold mb-0`}>Fast Service</h4>
        </ListGroup.Item>
        <ListGroup.Item
          className={`d-flex gap-2 align-items-center mb-3 bg-secondary border-0`}
        >
          <Image
            style={{ height: "28px" }}
            src="/images/homepage/verified.png"
            alt="verified"
          />
          <h4 className={`text-white fw-bold mb-0`}>Superb</h4>
        </ListGroup.Item>
        <ListGroup.Item
          className={`d-flex gap-2 align-items-center bg-secondary border-0`}
        >
          <Image
            style={{ height: "28px" }}
            src="/images/homepage/verified.png"
            alt="verified"
          />
          <h4 className={`text-white fw-bold mb-0`}>Relaxed & Great</h4>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
}

export default CustomerCommentCard;
