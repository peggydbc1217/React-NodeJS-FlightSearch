import AccountNavBar from "../../features/Account/AccountNavBar";
import AccountSideBar from "../../features/Account/AccountSideBar";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function Account() {
  const activeItem =
    useSelector((state) => state.accountBar?.activedItem) || "";

  return (
    <Container className="mt-5 ">
      <Row>
        <Col lg={2}>
          <AccountSideBar activeItem={activeItem} />
        </Col>

        <Col xs={12} lg={9} className="ms-lg-4 px-0">
          <AccountNavBar activeItem={activeItem} />
          <Outlet></Outlet>
        </Col>
      </Row>
    </Container>
  );
}

export default Account;
