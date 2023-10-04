import { Breadcrumb } from "react-bootstrap";

function AccountNavBar({ activeItem }) {
  return (
    <Breadcrumb className="">
      <p className="text-decoration-none text-secondary">Account</p>
      <p className="text-decoration-none text-secondary">/ {activeItem}</p>
    </Breadcrumb>
  );
}

export default AccountNavBar;
