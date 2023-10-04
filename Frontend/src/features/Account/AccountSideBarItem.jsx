import { Nav } from "react-bootstrap";
import styles from "./AccountSideBar.module.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccountBar } from "./accountBarSlice";

function AccountSideBarItem({ activeItem, title, path }) {
  const dispatch = useDispatch();

  return (
    <Nav.Item
      className={`col-6 col-lg-12 ${styles["sidebar_option"]} py-2 text-center  ${styles["sidebar_fs"]} `}
    >
      <Link
        to={path}
        className={` ${
          styles["sidebar_link"]
        } text-decoration-none text-secondary ${
          activeItem === title ? styles["sidebar_active"] : ""
        }`}
        onClick={() => dispatch(setAccountBar(title))}
      >
        {title}
      </Link>
    </Nav.Item>
  );
}

export default AccountSideBarItem;
