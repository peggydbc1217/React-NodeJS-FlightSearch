import React from "react";
import styles from "./Footer.module.scss"; // Import your SCSS module styles
import { Link } from "react-router-dom";

function FooterFunctionItem({ option }) {
  const { name, path } = option;

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  return (
    <li
      className={`${styles["nav-link-footer"]} ${styles["overflow-wrap-break"]}`}
    >
      <Link to={path} className={` link-light h5  `} onClick={scrollToTop}>
        {name.split(" ")[0]} <br /> {name.split(" ")[1]}
      </Link>
    </li>
  );
}

export default FooterFunctionItem;
