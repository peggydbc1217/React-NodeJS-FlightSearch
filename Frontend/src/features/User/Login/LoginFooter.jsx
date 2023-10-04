import React from "react";
import { Link } from "react-router-dom";

function LoginFooter() {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <h5 className="me-2">
        Don't have a <span className="text-primary">FlightEase</span> account?
      </h5>
      <p className="text-warning">
        <Link
          to="/user/signup"
          className={`text-warning`}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Sign Up Now
        </Link>
      </p>
    </div>
  );
}

export default LoginFooter;
