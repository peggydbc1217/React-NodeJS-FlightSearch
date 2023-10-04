import styles from "./Signup.module.scss";
import { Link } from "react-router-dom";

function SignupHeader() {
  return (
    <>
      <div>
        <Link to="/">
          <img
            className={`${styles["footer__img"]} pb-4 w-50`}
            src="/images/homepage/LOGO.png"
            alt="logo-footer"
          />
        </Link>
      </div>
      <h2 className="fw-bold py-4">Sign Up</h2>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h3 className="w-100">Already have a FlightEase account?</h3>
        <Link
          to="/user/login"
          className={`${styles["btn-hover"]} text-info text-secondary border border-3 p-2 ms-2 btn-warning rounded-0 fw-bold btn `}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Login
        </Link>
      </div>
    </>
  );
}

export default SignupHeader;
