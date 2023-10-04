import React, { Suspense } from "react";
import { Container, Row } from "react-bootstrap";
import NearAirportForm from "../features/NearAirport/NearAirportForm";

import AirportList from "../features/NearAirport/AirportList";
import FeatureHeader from "../ui/FeatureHeader";
import Loader from "../ui/Loader";

const LazyNearAirportMap = React.lazy(() =>
  import("../features/NearAirport/NearAirportMap")
);

function NearAirports() {
  return (
    <section className="py-5">
      <Container>
        <FeatureHeader title="Nearby Airports"></FeatureHeader>
        <NearAirportForm></NearAirportForm>
        <Row>
          <Suspense fallback={<Loader></Loader>}>
            <LazyNearAirportMap></LazyNearAirportMap>
          </Suspense>
          <AirportList></AirportList>
        </Row>
      </Container>
    </section>
  );
}

export default NearAirports;
