import React from "react";
import { Nav } from "react-bootstrap"; // Import Bootstrap components
import { FunctionOptions } from "../../services/constant";
import FooterFunctionItem from "./FooterFunctionItem";
import { v4 as uuidv4 } from "uuid";

const FooterFunctionList = () => {
  return (
    <Nav className="navbar-nav me-auto mb-2 mb-lg-0 d-lg-flex d-none flex-row justify-content-between align-items-center gap-xl-5 gap-lg-3">
      {FunctionOptions.map((option) => {
        const uniqueId = uuidv4();
        return <FooterFunctionItem option={option} key={uniqueId} />;
      })}
    </Nav>
  );
};

export default FooterFunctionList;
