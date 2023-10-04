import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccountBar } from "../../Account/accountBarSlice";

function FormFooter() {
  const dispatch = useDispatch();

  return (
    <div className="formFooter">
      <Container>
        <Row className="justify-content-center">
          <Col md={9} lg={12} xl={10} className="d-flex justify-content-end">
            <Link
              to="/"
              className="btn btn-warning me-4 p-2 px-sm-4 fs-5 fw-bold text-secondary border-0 text-center rounded-0"
              onClick={() => window.scrollTo(0, 0)}
            >
              Return to Home
            </Link>
            <Link
              to="/account/myOrder"
              className="btn btn-warning p-2 px-sm-4 fs-5 fw-bold text-secondary border-0 text-center rounded-0"
              onClick={() => {
                window.scrollTo(0, 0);
                dispatch(setAccountBar("My Orders"));
              }}
            >
              View My Reservations
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FormFooter;
