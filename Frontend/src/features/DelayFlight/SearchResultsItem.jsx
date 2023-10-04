import React from "react";
import styles from "./SearchResults.module.scss";
import SearchResultUpper from "./SearchResultUpper";
import SearchResultLower from "./SearchResultLower";
import { useState } from "react";
import { getAirportFullNameAndCountry } from "../../services/airLabApi";
import { toast } from "react-hot-toast";
import Spinner from "../../ui/Spinner";

function SearchResultsItem({ flight }) {
  const [isActive, setIsActive] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  // use to prevent user from clicking the button in the lower part of the card
  const [airportNameAndCountry, setAirportNameAndCountry] = useState(null);
  const { flight_iata } = flight;

  const handleClick = async () => {
    setIsLoading(true);
    try {
      if (isActive) {
        setIsActive((isActive) => !isActive);
        return;
      }
      const airportNameAndCountry = await getAirportFullNameAndCountry(
        flight_iata
      );

      setAirportNameAndCountry(airportNameAndCountry);
      setIsActive((isActive) => !isActive);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li
      className={`${styles["flightCard"]} mb-3 mb-md-0`}
      onClick={handleClick}
    >
      {/* <!-- upper --> */}
      <SearchResultUpper flight={flight}></SearchResultUpper>

      {/* <!-- lower --> */}
      {isloading && <Spinner></Spinner>}
      {isActive && !isloading && (
        <SearchResultLower
          flight={flight}
          isActive={isActive}
          onActive={setIsActive}
          airportNameAndCountry={airportNameAndCountry}
        ></SearchResultLower>
      )}
    </li>
  );
}

export default SearchResultsItem;
