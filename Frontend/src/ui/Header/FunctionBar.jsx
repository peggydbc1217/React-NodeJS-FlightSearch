import React from "react";
import styles from "./Header.module.scss"; // Import your SCSS module styles
import FunctionOption from "./FunctionOption";
import { v4 as uuidv4 } from "uuid";
import { FunctionOptions } from "../../services/constant";

function FunctionBar() {
  return (
    <ul
      className={`d-flex list-unstyled mb-0 flex-row justify-content-between bg-lg-primary align-items-center gap-lg-4 gap-sm-1 gap-2 py-2 py-sm-1 px-3 px-sm-0 px-md-3  ${styles["navbar-position-bottom"]}`}
    >
      {FunctionOptions.map((option, i) => {
        const uniqueId = uuidv4();

        return <FunctionOption key={uniqueId} option={option}></FunctionOption>;
      })}
    </ul>
  );
}

export default FunctionBar;
