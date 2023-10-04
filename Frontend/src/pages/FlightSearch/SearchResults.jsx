import React from "react";
import Pagination from "../../ui/Pagination";
import ProgressBar from "../../features/FlightSearch/ProgressBar";
import SearchResultsMain from "../../features/FlightSearch/SearchResults/SearchResultsMain";
import { useSelector } from "react-redux";
import { PAGE_PER_ROW } from "../../services/constant";
import FeatureHeader from "../../ui/FeatureHeader";

function SearchResults() {
  const flight = useSelector((state) => state.flightSearch.flight);
  const totalPage = Math.ceil(flight.length / PAGE_PER_ROW);

  return (
    <>
      <main className="flightSearchPage position-relative">
        <ProgressBar activePage={2}></ProgressBar>
        <FeatureHeader title="Flight Search"></FeatureHeader>
        <SearchResultsMain></SearchResultsMain>
        {/* <Pagination totalPage={totalPage} source="flightSearch"></Pagination> */}
      </main>
    </>
  );
}

export default SearchResults;
