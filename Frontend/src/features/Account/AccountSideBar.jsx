import { Nav } from "react-bootstrap";
import AccountSideBarItem from "./AccountSideBarItem";
import { accountPageOptions } from "../../services/constant";
import { v4 as uuidv4 } from "uuid";

function AccountSideBar({ activeItem }) {
  return (
    <Nav className="row border py-lg-3 d-flex flex-lg-column justify-content-lg-start justify-content-sm-evenly justify-content-between mb-3 mb-lg-0">
      {accountPageOptions.map((item) => {
        const uniqueId = uuidv4();
        return (
          <AccountSideBarItem
            key={uniqueId}
            title={item.name}
            path={item.path}
            activeItem={activeItem}
          />
        );
      })}
    </Nav>
  );
}

export default AccountSideBar;
