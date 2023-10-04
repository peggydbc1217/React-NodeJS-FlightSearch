import React from "react";
import { Card } from "react-bootstrap";
import styles from "../../../Custom.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

function CardBackContent() {
  const user = useSelector((state) => state.user?.currentUser) || {};
  const hasUser = Object.keys(user).length > 0;

  const handleClick = (e) => {
    if (hasUser) {
      e.preventDefault();
      toast.error("Please logout first", {
        style: {
          border: "1px solid #eac14a",
          padding: "16px",
          color: "#1d3455",
        },
        iconTheme: {
          primary: "#eac14a",
          secondary: "#FFFAEE",
        },
      });
      return;
    }
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Card.Img
        className={`${styles["mx-auto"]} mt-4`}
        src="/images/homepage/account.png"
        style={{ height: "64px", width: "64px" }}
        alt="account"
      />
      <Link
        to={"user/signup"}
        className="btn btn-warning fw-bold mt-4 rounded-0"
        onClick={handleClick}
      >
        Join Now
      </Link>
    </>
  );
}

export default CardBackContent;
