import React from "react";
import { Navbar, Container } from "react-bootstrap";
import styles from "./Header.module.scss"; // Import your SCSS module styles
import FunctionBar from "./FunctionBar";
import AccountBar from "./AccountBar";
import FlexCenter from "../FlexCenter";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const loading = useSelector((state) => state.loading?.isLoading);
  const handleClick = (e) => {
    e.preventDefault();
  };
  return (
    <Navbar
      bg="body-tertiary"
      variant="dark"
      expand="lg"
      sticky="top"
      className={`navbar py-3 ${styles["navbar-position-top-sticky"]} px-3 border-bottom border-2 border-body-secondary`}
    >
      <Container
        fluid
        className="d-flex flex-xxl-row flex-column justify-content-sm-between  px-lg-0 align-items-center gap-3 w-100 p-0 m-0"
      >
        <Link to="/" onClick={loading && handleClick}>
          <img
            className={`${styles["navbar-img"]}`}
            src="/images/homepage/logo_navbar.png"
            alt="logo navbar"
          />
        </Link>

        <FlexCenter>
          <FunctionBar></FunctionBar>
          <AccountBar> </AccountBar>
        </FlexCenter>
      </Container>
    </Navbar>
  );
}

export default Header;
