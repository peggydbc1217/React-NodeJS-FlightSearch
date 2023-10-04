import styles from "./SearchResults.module.scss";
import useLazyBackgroundImg from "../../../CustomHook/useLazyBackgroundImg";

function SearchResultUpper({ flight }) {
  const {
    airline_iata,
    flight_iata,
    dep_terminal,
    dep_iata,
    dep_time,
    arr_iata,
    arr_time,
    status,
    duration,
    arr_terminal,
    airlineFullName,
  } = flight;

  const arr_time_mins = arr_time.split(" ")[1];
  const dep_time_mins = dep_time.split(" ")[1];

  const loaded = useLazyBackgroundImg("/images/flightCardTemp.jpg");

  return (
    <div
      className={`${styles["flight-polygon-border"]} ${styles["p-12"]} d-flex`}
      style={{
        filter: `${loaded ? "blur(0)" : "blur(8px)"}`,
      }}
    >
      <div
        className={`${styles["flightCard-rwd-width"]} d-flex flex-column flex-md-row align-items-center justify-content-between`}
      >
        <div className="">
          <div className="d-flex align-items-center">
            <div
              className="
            "
            >
              <img
                className="transparent-image"
                src={`https://www.gstatic.com/flights/airline_logos/70px/${airline_iata}.png`}
                alt="flightCompany"
                height="70px"
              />
              <p className="d-none d-md-block mt-0 mt-lg-3 mb-0 text- h5 bg-primary ">
                {flight_iata}
              </p>
            </div>
            <h5 className="ms-sm-3 text-primary bg-secondary">
              {airlineFullName}
            </h5>
          </div>
        </div>
        <div className="d-flex mb-0 align-items-center flex-row flex-lg-row gap-3">
          <div className="d-flex align-items-center gap-2">
            <div>
              <p className="mb-0 h1 text-secondary">{dep_iata}</p>
              <time>{dep_time_mins}</time>
            </div>
            <p className="mb-4 h1 text-secondary">&rarr;</p>
            <div className="">
              <p className="mb-0 h1 text-secondary">{arr_iata}</p>
              <time>{arr_time_mins}</time>
            </div>
          </div>
          <div className="bg-primary">
            <p className="mb-0 p-2 h4 text-secondary">{status}</p>
          </div>
        </div>
        <img
          className="d-none d-md-block"
          src="/images/homepage/flightSearch-plane.png"
          alt="plane"
          height="67px"
        />
      </div>
      <div
        className={`${styles["flight-polygon-border-overlap"]}`}
        style={{
          backgroundImage: `url(${loaded || "/images/flightCardTemp-low.jpg"})`,
          filter: `${loaded ? "blur(0)" : "blur(8px)"}`,
        }}
      ></div>
    </div>
  );
}

export default SearchResultUpper;
