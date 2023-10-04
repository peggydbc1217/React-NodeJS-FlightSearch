import styles from "./PassengerInfo.module.scss";

function PassengerHeader() {
  return (
    <div className="position-relative">
      <h3 className="text-secondary py-2 px-4 fs-5 fw-bold d-inline-block w-auto fs-2 ps-0">
        Reservation form for passenger
      </h3>
      <div
        className={`bg-primary position-absolute opacity-50 ${styles["customized-highlight"]}`}
      ></div>
    </div>
  );
}

export default PassengerHeader;
