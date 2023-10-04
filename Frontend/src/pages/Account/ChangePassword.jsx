import { Container, Row, Col } from "react-bootstrap";
import ChangePasswordForm from "../../features/Account/ChangePassword/ChangePasswordForm";

function ChangePassword() {
  return (
    <Container fluid>
      <Row>
        <Col lg={10} className={`ps-lg-4`}>
          <ChangePasswordForm></ChangePasswordForm>
        </Col>
      </Row>
    </Container>
  );
}

export default ChangePassword;
