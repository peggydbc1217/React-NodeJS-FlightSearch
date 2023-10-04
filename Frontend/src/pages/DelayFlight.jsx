import React, { Suspense } from "react";
import { Container } from "react-bootstrap";
import FeatureHeader from "../ui/FeatureHeader";
import DelayedFlightsForm from "../features/DelayFlight/DelayedFlightsForm";
import Pagination from "../ui/Pagination";
import DelaySearchResultsMain from "../features/DelayFlight/DelaySearchResultsMain";
import { useSelector } from "react-redux";
import { PAGE_PER_ROW } from "../services/constant";
import Loader from "../ui/Loader";

// const LazyDelayedFlightsForm = React.lazy(() =>
//   import("../features/DelayFlight/DelayedFlightsForm")
// );

function DelayFlight() {
  const flight = useSelector((state) => state.delayedFlights?.flight) || [];
  const totalPage = Math.ceil(flight.length / PAGE_PER_ROW);

  return (
    <main className="mt-3">
      <FeatureHeader title="Delayed Flights"></FeatureHeader>
      <Container>
        {/* <Suspense fallback={<Loader></Loader>}> */}
        <DelayedFlightsForm></DelayedFlightsForm>
        {/* </Suspense> */}
        <DelaySearchResultsMain></DelaySearchResultsMain>
        <Pagination totalPage={totalPage} source="delayedFlights"></Pagination>
      </Container>
    </main>
  );
}

export default DelayFlight;
