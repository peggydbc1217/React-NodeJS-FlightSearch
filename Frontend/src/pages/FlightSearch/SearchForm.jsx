import ProgressBar from "../../features/FlightSearch/ProgressBar";
import React from "react";
import { Container } from "react-bootstrap";
import SearchFormMain from "../../features/FlightSearch/SearchForm/SearchFormMain";
import styles from "../../features/FlightSearch/SearchForm/SearchFormMain.module.scss";

function SearchForm() {
  return (
    <Container
      className={` ${styles["bg-cover"]} mt-5 pb-5`}
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(/images/homepage/bg.png)",
      }}
    >
      <ProgressBar activePage={1}></ProgressBar>
      <SearchFormMain></SearchFormMain>
    </Container>
  );
}

export default SearchForm;
