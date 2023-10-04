import { Container, Row, Col } from "react-bootstrap";
import ResetPasswordForm from "../../features/User/ResetPassword/ResetPasswordForm";
import UserHeader from "../../features/User/UserHeader";
import CountDown from "../../ui/CountDown";

function ResetPassword() {
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
            <UserHeader title="Reset Password"></UserHeader>
            <CountDown initialTime={600}></CountDown>
            <ResetPasswordForm></ResetPasswordForm>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ResetPassword;
