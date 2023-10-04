import styles from "./Header.module.scss"; // Import your SCSS module styles
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function FunctionOption({ option }) {
  const loading = useSelector((state) => state.loading?.isLoading);

  const { name, path } = option;

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <li>
      <Link
        to={path}
        className={`nav-link ${styles["nav-link-header"]} link-dark ${styles["focus-primary-light"]} h5 px-sm-5 px-0  mb-0"`}
        onClick={loading && handleClick}
      >
        {name.split(" ")[0]}
        <br />
        {name.split(" ")[1]}
      </Link>
    </li>
  );
}

export default FunctionOption;
