import styles from "./Header.module.scss"; // Import your SCSS module styles
import { Link } from "react-router-dom";
import { logout } from "../../services/myServerApi";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../features/User/userSlice";
import { setAccountBar } from "../../features/Account/accountBarSlice";

function AccountOption({ option }) {
  const { name, path } = option;
  // const loading = useSelector((state) => state.loading?.isLoading);
  const dispatch = useDispatch();

  const handleClick = async () => {
    //if is logout
    if (path === "/") {
      await logout();
      dispatch(setCurrentUser([]));
    } else {
      //if is account
      dispatch(setAccountBar("My Favorites"));
    }

    window.scrollTo(0, 0);
  };

  return (
    <>
      <li className={`${styles["navbar-navItem-top"]}`}>
        <Link
          to={path}
          className={`nav-link ${styles["nav-link-header"]} link-dark h5  py-3  px-1 mb-0`}
          href="#"
          onClick={handleClick}
        >
          {name}
        </Link>
      </li>
    </>
  );
}

export default AccountOption;
