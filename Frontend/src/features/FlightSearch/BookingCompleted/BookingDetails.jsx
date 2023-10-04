import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const options = {
  year: "numeric",

  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZoneName: "short",
};

function BookingDetails() {
  const {
    surname,
    givenName,
    flightClass,
    amount,
    dep_time,
    dep_name,
    arr_name,
    airlineFullName,
    flight_iata,
  } = useSelector((state) => state.booking.tempBooking);

  const formatedDate = new Date(dep_time).toLocaleDateString("en-US", options);

  return (
    <>
      <div className="py-5">
        {/* Row 1 */}
        <Row className="justify-content-center">
          <Col
            xs={12}
            md={9}
            lg={6}
            xl={5}
            className="mb-5 mb-sm-4 mb-lg-5 col-lg-5 d-flex"
          >
            <label className="fs-5 col-3 w-lg-20 d-flex my-auto border-1">
              Name
            </label>
            <div className="col-9 w-lg-80 p-3 bg-primary bg-opacity-25">
              <p className="text-secondary text-start m-0">
                {givenName}, {surname}
              </p>
            </div>
          </Col>
          <Col
            xs={12}
            md={9}
            lg={6}
            xl={5}
            className="ps-lg-2 mb-5 mb-sm-4 mb-lg-5 col-lg-5 d-flex"
          >
            <label className="fs-5 col-3 w-lg-20 d-flex my-auto">
              Ticket Count
            </label>
            <div className="col-9 w-lg-80 d-flex p-3 bg-primary bg-opacity-25">
              <p className="text-secondary text-start m-0">
                {amount} * {flightClass}
              </p>
            </div>
          </Col>
        </Row>

        {/* Row 2 */}
        <Row className="justify-content-center">
          <Col
            xs={12}
            md={9}
            lg={6}
            xl={5}
            className="mb-5 mb-sm-4 mb-lg-5 col-lg-5 d-flex"
          >
            <div className="col-3 w-lg-20 d-flex flex-column">
              <label className="fs-5 col-3 w-lg-20 d-flex my-auto border-1">
                Dep
              </label>
            </div>
            <div className="col-9 w-lg-80 d-flex justify-content-between py-2 px-3 bg-primary bg-opacity-25">
              <p className="text-secondary py-2 text-start m-0 my-auto">
                {dep_name}
              </p>
            </div>
          </Col>
          <Col
            xs={12}
            md={9}
            lg={6}
            xl={5}
            className="ps-lg-2 mb-5 mb-sm-4 mb-lg-5 col-lg-5 d-flex"
          >
            <label className={` fs-5 col-3 w-lg-20 d-flex my-auto border-1`}>
              Arrival
            </label>
            <div className="col-9 w-lg-80 d-flex justify-content-between py-2 px-3 bg-primary bg-opacity-25">
              <p className="text-secondary py-2 text-start m-0 my-auto">
                {arr_name}
              </p>
            </div>
          </Col>
        </Row>
        {/* ROW3 */}
        <Row className="justify-content-center">
          <Col
            xs={12}
            md={9}
            lg={6}
            xl={5}
            className="mb-5 mb-sm-4 mb-lg-5 col-lg-5 d-flex"
          >
            <div className="col-3 w-lg-20 d-flex flex-column">
              <label className="fs-5 col-3 w-lg-20 d-flex my-auto border-1">
                Time
              </label>
            </div>
            <div className="col-9 w-lg-80 d-flex justify-content-between py-2 px-3 bg-primary bg-opacity-25 px-md-0">
              <p className="text-secondary text-start m-0 my-auto ps-md-3">
                {formatedDate}
              </p>
            </div>
          </Col>

          <Col
            xs={12}
            md={9}
            lg={6}
            xl={5}
            className="ps-lg-2 mb-5 mb-sm-4 mb-lg-5 col-lg-5 d-flex"
          >
            <label className={` fs-5 col-3 w-lg-20 d-flex my-auto border-1`}>
              Flight
            </label>
            <div className="col-9 w-lg-80 d-flex justify-content-between py-2 px-3 bg-primary bg-opacity-25">
              <p className="text-secondary py-2 text-start m-0 my-auto">
                {airlineFullName}
              </p>
              <p className="text-secondary py-2 text-start m-0 my-auto">
                {flight_iata}
              </p>
            </div>
          </Col>
        </Row>
        {/* Row3 */}
      </div>
    </>
  );
}

export default BookingDetails;
