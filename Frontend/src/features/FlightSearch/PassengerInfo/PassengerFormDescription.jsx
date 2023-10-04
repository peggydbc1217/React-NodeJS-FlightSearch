import React from "react";
import { useSelector } from "react-redux";

function PassengerFormDescription({ selectedAmount, selectedClass }) {
  const { dep_iata, arr_iata, price } =
    useSelector((state) => state.booking.tempBooking) || {};

  const MutipliedByClass = (price, selectedClass) => {
    if (selectedClass === "Economy") return price * 1;
    if (selectedClass === "Premium Economy") return price * 1.5;
    if (selectedClass === "Business") return price * 2;
  };

  const priceMutipliedByClass = MutipliedByClass(price, selectedClass);

  return (
    <div className="mt-2 mb-3">
      <div className="d-flex mb-2">
        <span className="material-symbols-outlined me-2">flight_takeoff</span>
        <p className="m-0">
          {dep_iata} → {arr_iata}
        </p>
      </div>
      <div className="d-flex justify-content-start mb-3">
        <div className="m-0 border-end border-1 border-secondary py-0 col-6 d-flex flex-column flex-sm-row flex-md-column flex-lg-row justify-content-between pe-lg-2 pe-xxl-3">
          <p className="m-0 pe-3 pe-lg-0">{selectedClass}</p>
          <p className="m-0 pe-2 pe-lg-0">
            USD. {priceMutipliedByClass.toString()}
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-start mb-3">
        <div className="m-0 border-end border-1 border-secondary py-0 col-6 d-flex flex-column flex-sm-row flex-md-column flex-lg-row justify-content-between pe-lg-2 pe-xxl-3">
          <p className="m-0 pe-3 pe-lg-0">Amount</p>
          <p className="m-0 pe-2 pe-lg-0 ">{selectedAmount}</p>
        </div>
      </div>
      <div className="d-flex justify-content-start">
        <div className="m-0 border-end border-1 border-secondary py-0 col-6 d-flex flex-column flex-sm-row flex-md-column flex-lg-row justify-content-between pe-lg-2 pe-xxl-3">
          <p className="m-0 pe-3 pe-lg-0">Total</p>
          <p className="m-0 pe-2 pe-lg-0 ">
            USD.{" "}
            <span className="h3 fw-bold text-primary">
              {(priceMutipliedByClass * selectedAmount).toString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PassengerFormDescription;
