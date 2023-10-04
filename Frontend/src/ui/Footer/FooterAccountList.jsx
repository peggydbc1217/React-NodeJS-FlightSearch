import React from "react";
import { Nav } from "react-bootstrap"; // Import Bootstrap components
import FooterAccountItem from "./FooterAccountItem";
import { loginOptions, logoutOptions } from "../../services/constant";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

const FooterAccountList = () => {
  const user = useSelector((state) => state.user?.currentUser) || {};
  let AccountOptions;
  if (Object.keys(user).length !== 0) {
    AccountOptions = logoutOptions;
  } else {
    AccountOptions = loginOptions;
  }
  return (
    <Nav
      className="navbar-nav mb-lg-2 d-lg-flex d-none flex-row 
    justify-content-between align-items-center gap-lg-5"
    >
      {AccountOptions.map((option) => {
        const uniqueId = uuidv4();
        return <FooterAccountItem option={option} key={uniqueId} />;
      })}
    </Nav>
  );
};

export default FooterAccountList;
