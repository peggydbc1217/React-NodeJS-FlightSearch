import React from "react";
import { Link } from "react-router-dom";

function SearchFormTitle() {
  return (
    <div>
      <p className="text-secondary  h3 text-center">
        Search for flights from now up to 6 hours later.
      </p>
      <p className="text-secondary  h5 text-center mb-3">
        It's recommended to <Link to="/user/login">log in</Link> first to book
        your flight. ✈️
      </p>
      <p className="text-secondary h5 text-center mb-3">
        🛑 Quick heads up, the results here only display{" "}
        <span className="text-danger">direct flights.</span> 🛑
      </p>
    </div>
  );
}

export default SearchFormTitle;
