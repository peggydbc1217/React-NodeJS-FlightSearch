import React from "react";
import { Nav } from "react-bootstrap";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import { logout } from "../../services/myServerApi";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../features/User/userSlice";
import { setAccountBar } from "../../features/Account/accountBarSlice";

function FooterAccountItem({ option }) {
  const { name, path } = option;
  const dispatch = useDispatch();

  const handleClick = async () => {
    if (path === "/") {
      await logout();
      dispatch(setCurrentUser([]));
    } else {
      dispatch(setAccountBar("My Favorites"));
    }

    window.scrollTo(0, 0);
  };

  return (
    <Nav.Item className="ms-lg-5">
      <Link
        to={path}
        className={`nav-link link-light ${styles["nav-link-footer"]} h5 py-3 px-2 `}
        href="#"
        onClick={handleClick}
      >
        {name}
      </Link>
    </Nav.Item>
  );
}

export default FooterAccountItem;
