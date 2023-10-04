import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SignupHeader from "../../features/User/Signup/SignupHeader";
import SignupForm from "../../features/User/Signup/SignupForm";

function Signup() {
  return (
    <div
      className={`py-5`}
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(/images/homepage/bg.png)",
        backgroundSize: "cover",
      }}
    >
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col lg={4}>
            <div className="text-center">
              <SignupHeader></SignupHeader>
              <SignupForm></SignupForm>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signup;
