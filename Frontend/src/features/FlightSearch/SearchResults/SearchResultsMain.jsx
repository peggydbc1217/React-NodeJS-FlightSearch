import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import SearchResultsItem from "./SearchResultsItem";
import { useCallback, useRef, useState } from "react";
import Spinner from "../../../ui/Spinner";

const FLIGHTS_PER_ROW = 6;
const ADDITIONAL_FLIGHTS = 6;

function SearchResultsMain() {
  const flight = useSelector((state) => state.flightSearch.flight);

  // used to simulate fetch flights data from server
  const [isLoading, setIsLoading] = useState(false);

  // Initialize flightPerPage
  const [flightPerPage, setFlightPerPage] = useState(() =>
    flight.slice(0, FLIGHTS_PER_ROW)
  );

  //infinite scroll - set last element as observer target
  const observer = useRef(null);
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;

      // when the last element has been assigned to the observer(which means it has been used), disconnect the previous observer
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // If intersection is detected, ready to load more flights
          let endIdx = flightPerPage.length + ADDITIONAL_FLIGHTS;

          let hasMoreFlights;

          if (endIdx < flight.length + ADDITIONAL_FLIGHTS) {
            hasMoreFlights = true;
            endIdx = flight.length;
          } else {
            hasMoreFlights = false;
          }

          console.log(endIdx, flight.length + 6, hasMoreFlights);

          if (hasMoreFlights) {
            setIsLoading(true);

            // Simulate fetch data from server
            setTimeout(() => {
              const newFlights = flight.slice(0, endIdx);
              setFlightPerPage(newFlights);
              setIsLoading(false);
            }, 2000);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, flight, flightPerPage]
  );

  return (
    <Container className="mt-5">
      <ul className="list-unstyled">
        {flightPerPage.map((airplane, i) => {
          const key = airplane.flight_iata;

          //check if it is the last element
          if (flightPerPage.length === i + 1) {
            return (
              <SearchResultsItem
                flight={airplane}
                key={key}
                ref={lastElementRef}
              ></SearchResultsItem>
            );
          } else {
            return (
              <SearchResultsItem
                flight={airplane}
                key={key}
              ></SearchResultsItem>
            );
          }
        })}
      </ul>
      {isLoading && <Spinner></Spinner>}
    </Container>
  );
}

export default SearchResultsMain;
