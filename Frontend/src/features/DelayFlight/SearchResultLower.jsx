import React from "react";
import styles from "./SearchResults.module.scss";
import useLazyBackgroundImage from "../../CustomHook/useLazyBackgroundImg";

function SearchResultLower({ flight, isActive, airportNameAndCountry }) {
  const {
    flight_iata,
    dep_iata,
    dep_time,
    arr_iata,
    arr_time,
    arr_estimated,
    dep_estimated,
    delayed,
  } = flight;

  const { arr_name, arr_country, dep_name, dep_country, arr_city, dep_city } =
    airportNameAndCountry || {};

  const loaded = useLazyBackgroundImage("/images/searchFormLowerBg.jpg");

  return (
    <>
      <div
        className={`${styles["flightCard-rwd-width"]} ${
          styles["flightCard-lower"]
        } ${styles["px-12"]} justify-content-between gap-1 gap-sm-3 py-3 
        ${isActive && styles["flightCard-lower-active"]} position-relative`}
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${
            loaded || "/images/searchFormLowerBg-low.jpg"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: `${loaded ? "blur(0)" : "blur(10px)"}`,
        }}
      >
        {/* LEFT */}
        <div
          className={`${styles["w-30"]} d-flex flex-column justify-content-between`}
        >
          <div className="d-flex  mb-3 gap-0">
            <span className={`fi fi-${dep_country?.toLowerCase()} w-50`}></span>
            <h3 className="mb-0 fw-bold text-secondary">{dep_iata}</h3>
          </div>
          <p
            className={`${styles["overflow-wrap-break"]} mb-3 text-secondary text-center`}
          >
            {dep_name}
          </p>
          <p className="text-center d-none d-sm-block">{dep_city}</p>
          <time className="d-block text-center mb-1">
            {dep_estimated ? dep_estimated : "Unknown"}
          </time>
          <time className="text-center text-danger mb-1 text-decoration-line-through opacity-50">
            {dep_time}
          </time>
        </div>

        {/* CENTER */}
        <div
          className={`${styles["w-20"]} d-flex flex-column justify-content-between align-self-sm-center align-self-end align-items-center`}
        >
          <p className="d-block d-md-none mb-3 text-center h5 fw-bold">
            {flight_iata}
          </p>
          <h3 className="mb-3">Delayed</h3>
          <h3 className="mb-3 text-danger">{delayed}mins</h3>
          <img
            className={`${styles["w-15"]} ${styles["moveUpandDown-animation"]} d-none d-sm-block mb-3`}
            src="/images/homepage/airplane-flightCard.png"
            alt="airplane"
          />
          <img
            className={`${styles["rwd-width-50-md-15"]} ${styles["arrow-moveIn-animation"]} d-block  mb-3 `}
            src="/images/homepage/right-arrow-blue.png"
            alt="rightArrow"
          />
        </div>

        {/* RIGHT */}
        <div
          className={`${styles["w-30"]} d-flex flex-column justify-content-between`}
        >
          <div className="d-flex mb-3">
            <span className={`fi fi-${arr_country?.toLowerCase()} w-50`}></span>
            <h3 className="mb-0 fw-bold text-secondary">{arr_iata}</h3>
          </div>
          <p
            className={`${styles["overflow-wrap-break"]} mb-3 text-secondary text-center `}
          >
            {arr_name}
          </p>
          <p className="d-none d-sm-block text-center">{arr_city}</p>
          <time className="d-block text-center mb-1">
            {arr_estimated ? arr_estimated : "Unknown"}
          </time>
          <time className="text-center text-danger mb-1 text-decoration-line-through opacity-50">
            {arr_time}
          </time>
        </div>
      </div>
    </>
  );
}

export default SearchResultLower;
