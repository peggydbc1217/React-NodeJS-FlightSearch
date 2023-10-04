import { Container, Row, Col } from "react-bootstrap";
import LoginFooter from "../../features/User/Login/LoginFooter";
import LoginForm from "../../features/User/Login/LoginForm";
import UserHeader from "../../features/User/UserHeader";

function Login() {
  return (
    <div
      className={`py-5 position-relative`}
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(/images/homepage/bg.png)",
        backgroundSize: "cover",
      }}
    >
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col lg={4} className="text-center">
            <UserHeader title="Login"></UserHeader>
            <LoginForm></LoginForm>
            <hr />
            <LoginFooter></LoginFooter>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
