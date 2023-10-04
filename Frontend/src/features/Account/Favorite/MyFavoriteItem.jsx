import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import styles from "./MyFavoriteItem.module.scss";
import { formatDate } from "../../../services/otherApi";
import { minutesToHoursAndMinutes } from "../../../services/otherApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTempBooking } from "../bookingSlice";
import { deleteFavorite } from "../../../services/myServerApi";
import { useCustomDelete } from "../../../CustomHook/useCustomDelete";

function MyFavoriteItem({ order }) {
  const {
    airline_iata,
    dep_iata,
    arr_iata,
    dep_name,
    arr_name,
    dep_time,
    dep_country,
    arr_country,
    arr_time,

    flight_iata,
    duration,
    _id,
  } = order || {};

  const {
    date: depDate,
    time: depTime,
    timeZone: depTimeZone,
  } = formatDate(dep_time);

  const {
    date: arrDate,
    time: arrTime,
    timeZone: arrTimeZone,
  } = formatDate(arr_time);

  const durationTime = minutesToHoursAndMinutes(duration);

  //handle book button
  const dispatch = useDispatch();
  const handelSetTempBooking = (order) => {
    dispatch(setTempBooking(order));
  };

  //use react query mutation to delete favorite
  const deleteMutation = useCustomDelete(deleteFavorite, "myFavorites", _id);
  const handleDeleteFavorite = async (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <>
      <Row className={`border mb-0 w-100 mx-0 mb-md-3`}>
        <Col
          className={`p-0 m-0 d-flex flex-column justify-content-center align-items-center`}
        >
          <img
            className="transparent-image img-fluid "
            src={`https://www.gstatic.com/flights/airline_logos/70px/${airline_iata}.png`}
            alt="flightCompany"
            height="70px"
          />
          <p className="mb-0 text-center fw-bold ">{flight_iata}</p>
        </Col>
        <Col
          className={`text-center p-0 d-flex justify-content-center align-items-center `}
        >
          <div
            className={`${styles["timeTag"]}  ${styles["departureTime"]} text-break`}
          >
            {depDate}
            <br />
            {depTime} <br />
            {depTimeZone}
          </div>
        </Col>
        <Col
          className={`p-0 text-center d-flex flex-column justify-content-sm-between justify-content-center ${styles["p-0"]}`}
        >
          <div className={`  ${styles["airportCode"]}`}>{dep_iata}</div>
          <div className={` d-none d-sm-block ${styles["airportName"]}`}>
            {dep_name}
          </div>
          <div className={`d-none d-sm-block ${styles["airportCountry"]}`}>
            {dep_country}
          </div>
        </Col>
        <Col className={`p-0 d-flex flex-column justify-content-center`}>
          <div className={`text-center mb-2 ${styles["timeUse"]}`}>
            {durationTime}
          </div>
          <div className={`${styles["singleArrow"]} `}></div>
        </Col>
        <Col
          // xs={2}
          className={`p-0 text-center d-flex flex-column justify-content-sm-between justify-content-center `}
        >
          <div className={` ${styles["airportCode"]}`}>{arr_iata}</div>
          <div className={` d-none d-sm-block ${styles["airportName"]}`}>
            {arr_name}
          </div>
          <div className={` d-none d-sm-block ${styles["airportCountry"]}`}>
            {arr_country}
          </div>
        </Col>
        <Col
          // xs={2}
          className={`text-center p-0 d-flex justify-content-center align-items-center text-break`}
        >
          <div className={` ${styles["timeTag"]}`}>
            {arrDate}
            <br />
            {arrTime} <br />
            {arrTimeZone}
          </div>
        </Col>
        <Col
          md={1}
          className="p-1 d-md-flex justify-content-center flex-column d-none"
        >
          <Link to="/flightSearch/PassengerInfo">
            <Button
              variant="warning"
              size="sm"
              className="rounded-0 mb-2 w-100"
              onClick={() => handelSetTempBooking(order)}
            >
              Book
            </Button>
          </Link>
          <Link>
            <Button
              variant="danger"
              size="sm"
              className="rounded-0 w-100"
              onClick={() => {
                handleDeleteFavorite(_id);
              }}
            >
              Del
            </Button>
          </Link>
        </Col>
      </Row>

      {/* Only shows under 767px */}
      <Row className={`justify-content-around mb-3 d-md-none w-100 mx-0`}>
        <Col className="px-0 ">
          <Link>
            <Button
              variant="warning"
              size="sm"
              className={`btn-sm btn-primary ${styles["rounded-lb"]} w-100 `}
            >
              Book
            </Button>
          </Link>
        </Col>
        <Col className="px-0 ">
          <Link>
            <Button
              variant="danger"
              size="sm"
              className={`btn-sm btn-primary ${styles["rounded-rb"]} w-100 `}
            >
              Remove
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
}

export default MyFavoriteItem;
