import { Container, Row, Col } from "react-bootstrap";
import ForgotPasswordForm from "../../features/User/ForgotPassword/ForgotPasswrodForm";
import UserHeader from "../../features/User/UserHeader";

function ForgotPassword() {
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
          <Col lg={4} className="text-center">
            <UserHeader title="Forgot Password"></UserHeader>
            <p className="fs-6">
              You will receive an email containing a token. Please ensure that
              your email address is correct.
            </p>

            <ForgotPasswordForm></ForgotPasswordForm>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ForgotPassword;
