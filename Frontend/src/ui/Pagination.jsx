import React from "react";
import { Container, Button, ButtonGroup } from "react-bootstrap";
import styles from "./Pagination.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { setCurrentPage as setflightSearchCurrentPage } from "../features/FlightSearch/flightSearchSlice";
import { setCurrentPage as setdelayedFlightsCurrentPage } from "../features/DelayFlight/delayedFlightsSlice";
import { PAGE_PER_ROW } from "../services/constant";

import { useState } from "react";

function Pagination({ totalPage, source }) {
  //dynamic useSelector from source
  const selectFlightSearchCurrentPage = (state) =>
    state.flightSearch.currentPage;
  const selectDelayedFlightsCurrentPage = (state) =>
    state.delayedFlights.currentPage;

  //USED FOR PAGINATION BUTTONS SHOW,  EX. 7PAGES -->  1,2,3,4,5  --> 6,7,8
  const [currentPagination, setCurrentPagination] = useState(1);
  const totalPagination = Array.from({ length: totalPage }, (_, i) => i + 1);
  const paginationStart = (currentPagination - 1) * PAGE_PER_ROW;
  const paginationEnd = currentPagination * PAGE_PER_ROW - 1;
  const currentPaginationRenderArr =
    totalPagination?.slice(paginationStart, paginationEnd + 1) || 0;

  /////////////////////////////
  let selectCurrentPage = (state) => null;
  let setCurrentPage;

  switch (source) {
    case "flightSearch": {
      selectCurrentPage = selectFlightSearchCurrentPage;
      setCurrentPage = setflightSearchCurrentPage;
      break;
    }
    case "delayedFlights": {
      selectCurrentPage = selectDelayedFlightsCurrentPage;
      setCurrentPage = setdelayedFlightsCurrentPage;
      break;
    }
    default: {
    }
  }

  const currentPage = useSelector(selectCurrentPage);

  const dispatch = useDispatch();

  function goToNextPage() {
    if (currentPage < totalPage && currentPage >= 1) {
      dispatch(setCurrentPage(currentPage + 1));
    }
    if (currentPage === totalPage - 1) {
      window.scrollTo(0, 150);
    }
    if (currentPage === paginationEnd + 1) {
      setCurrentPagination(currentPagination + 1);
    }
  }

  function goToPreviousPage() {
    if (currentPage <= totalPage && currentPage !== 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }

    if (currentPage === paginationStart + 1 && paginationStart !== 0) {
      setCurrentPagination(currentPagination - 1);
    }
  }

  function goToPage(page) {
    dispatch(setCurrentPage(page));
    if (page === totalPage) {
      window.scrollTo(0, 150);
    }
  }

  if (totalPage === 0) return <></>;

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Button
        variant="warning"
        className={`${styles["carousel-hover"]} btn-primary rounded-0 p-0 d-block`}
        onClick={goToPreviousPage}
      >
        <img src="/images/homepage/Arrow Pointing Left.png" alt="arrow_left" />
      </Button>
      <ButtonGroup className="list-unstyled d-flex align-items-center mb-0 mx-3 gap-2 ">
        {currentPaginationRenderArr.map((i) => {
          // console.log(i, currentPage);
          return (
            <Button
              variant="outline-warning"
              className={`btn mb-0 fs-4 link-secondary fw-bold ${
                styles["pagination-btn-focus"]
              } ${currentPage === i ? styles["pagination-btn-active"] : ""}`}
              key={i}
              onClick={() => goToPage(i)}
            >
              {i}
            </Button>
          );
        })}
      </ButtonGroup>
      <Button
        variant="warning"
        className={`${styles["carousel-hover"]} btn-primary rounded-0 p-0 d-block`}
        onClick={goToNextPage}
      >
        <img src="/images/homepage/Right Arrow.png" alt="arrow_right" />
      </Button>
    </Container>
  );
}

export default Pagination;
