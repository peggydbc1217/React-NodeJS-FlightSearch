import React from "react";
import { Container } from "react-bootstrap";
import { Link, useRouteError } from "react-router-dom";

function Error({ message, type = "normal" }) {
  const isTypeLogin = type === "login";
  let error = useRouteError();

  // check error message is from react router or my custom error message
  const errorMessage = error?.error?.message ? error?.error?.message : message;

  return (
    <main
      className="py-5"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(/images/error.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <Container className="d-flex flex-column align-items-center gap-3">
        <h2 className="text-secondary text-center fw-bold ls-10 rfs-80">
          ❌ An Error Occurred ❌
        </h2>
        <div className="d-flex align-items-center gap-2 mt-4 justify-content-between">
          <div xs={6} md={4}>
            <img
              className=""
              src="/images/sorry.png"
              alt="sorry"
              style={{ height: "128px", width: "128px" }}
            />
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-secondary text-center fw-bold ls-10 h2">
            Reason: <span className="text-danger fs-5">{errorMessage}</span>
          </h2>
        </div>
        <Link
          to={isTypeLogin ? "/user/login" : "/"}
          className="btn btn-warning text-secondary fw-bold rounded-0"
          onClick={() => window.scrollTo(0, 0)}
        >
          {isTypeLogin ? "Login" : "Back to Homepage"}
        </Link>
      </Container>
    </main>
  );
}

export default Error;
