import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import styles from "./MyOrderItem.module.scss";
import { formatDate } from "../../../services/otherApi";
import { minutesToHoursAndMinutes } from "../../../services/otherApi";
import Modal from "../../../ui/Modal";
import { useState } from "react";

function MyOrderItem({ order }) {
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
    airlineFullName,
    flight_iata,
    duration,
    flightClass,
    price,
    amount,
  } = order || {};

  //MODAL SET SHOW
  const [show, setShow] = useState(false);

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

  return (
    <>
      <Row className={`border mb-0 w-100 mx-0 mb-md-3`}>
        <Col
          // xs={2}
          // sm={1}
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
          className={`p-0 text-center d-flex flex-column justify-content-sm-between justify-content-center ${styles[""]} px-1`}
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
          <div className={` text-center mb-2 ${styles["timeUse"]}`}>
            {durationTime}
          </div>
          <div className={`${styles["singleArrow"]}`}></div>
        </Col>
        <Col
          // xs={2}
          className={`p-0 text-center d-flex flex-column justify-content-sm-between justify-content-center px-1`}
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
          <Button
            variant="warning"
            size="sm"
            className="rounded-0  w-100"
            onClick={() => setShow(true)}
          >
            Details
          </Button>
        </Col>
      </Row>

      {/* Only shows under 767px */}
      <Row className={`justify-content-around mb-3 d-md-none w-100 mx-0`}>
        <Col className="px-0 ">
          <Button
            variant="warning"
            size="sm"
            className={`btn-sm btn-primary ${styles["rounded-rl"]} w-100 `}
            onClick={() => setShow(true)}
          >
            Details
          </Button>
        </Col>
      </Row>
      <Modal
        show={show}
        onSetShow={setShow}
        title={`Your Booking`}
        MessageComponent={
          <BookingDetailsModal
            flightClass={flightClass}
            amount={amount}
            price={price}
          ></BookingDetailsModal>
        }
      ></Modal>
    </>
  );
}

//MDOAL COMPONENT
function BookingDetailsModal({ flightClass, price, amount }) {
  return (
    <>
      <p className="h5 text-center font-weight-bold mb-3">
        ✈️ Flight Class: <span className="text-primary">{flightClass}</span>
      </p>
      <p className="h5 text-center font-weight-bold mb-3">
        💲 Price: USD$ <span className="text-primary">{price}</span>
      </p>
      <p className="h5 text-center font-weight-bold mb-3">
        👤 Passengers: <span className="text-primary"> {amount}</span>
      </p>
      <p className="h5 text-center font-weight-bold mb-3">
        💰 Total Price: USD${" "}
        <span className="text-primary"> {price * amount}</span>
      </p>
    </>
  );
}

export default MyOrderItem;
