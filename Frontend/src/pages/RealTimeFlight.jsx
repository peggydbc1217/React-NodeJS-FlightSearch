import { Container } from "react-bootstrap";
import FeatureHeader from "../ui/FeatureHeader";
import RealTimeForm from "../features/RealTimeFlight/RealTimeForm";
// import RealTimeMap from "../features/RealTimeFlight/RealTimeMap";
import React, { Suspense } from "react";
import Loader from "../ui/Loader";

const LazyRealTimeMap = React.lazy(() =>
  import("../features/RealTimeFlight/RealTimeMap")
);

function RealTimeFlight() {
  return (
    <section className="py-5">
      <Container>
        <FeatureHeader title="Aircraft Coordinates"></FeatureHeader>
        <RealTimeForm></RealTimeForm>
        <Suspense fallback={<Loader></Loader>}>
          <LazyRealTimeMap></LazyRealTimeMap>
        </Suspense>
      </Container>
    </section>
  );
}

export default RealTimeFlight;
