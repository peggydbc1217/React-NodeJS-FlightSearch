import React from "react";
import styles from "./Footer.module.scss"; // Import your SCSS module styles
import { Link } from "react-router-dom";

function FooterIcon({ imgName, url }) {
  return (
    <li className={`${styles["footer_nav_link_icon"]}`}>
      <Link to={url} className={`link-white h5 py-1 px-2`} target="_blank">
        <img
          src={`/images/homepage/${imgName}.png`}
          style={{ height: "48px" }}
          alt={imgName}
        />
      </Link>
    </li>
  );
}

export default FooterIcon;
