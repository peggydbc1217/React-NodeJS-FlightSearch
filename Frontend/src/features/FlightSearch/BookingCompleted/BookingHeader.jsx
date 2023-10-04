import { Container, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

function BookingHeader() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} className="position-relative ">
          <h3 className="text-secondary py-2 px-4 fw-bold fs-1 text-center">
            Payment Successful🎉
          </h3>
          <div
            className={`bg-primary position-absolute opacity-50  w-50 top-50 end-25`}
          ></div>
        </Col>
        <Col>
          <Alert
            variant="success"
            className="fs-6 fw-bold text-center mt-2 text-secondary mb-3"
          >
            You can view your reservation details in the
            <Link to="/account/myOrder"> My Reservations page.</Link>
            ✈️
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}

export default BookingHeader;
