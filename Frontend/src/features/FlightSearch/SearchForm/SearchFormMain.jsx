import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setFlight } from "../flightSearchSlice";
import { loadingStart, loadingComplete } from "../../Loading/loadingSlice";

import { Button, Dropdown, Col, Container, Row } from "react-bootstrap";
import { toast } from "react-hot-toast";

import { airportIATACodes } from "../../../services/constant";
import { getAirportSchedule } from "../../../services/airLabApi";
import { airlineFullNameArr } from "../../../services/otherApi";

import SearchFormTitle from "./SearchFormTitle";

const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

function validateInput(DepAirport, DesAirport) {
  if (DepAirport === "--Not Selected--" || DesAirport === "--Not Selected--") {
    throw new Error("Please select departure and destination airport.");
  }

  if (DepAirport === DesAirport) {
    throw new Error("Departure and destination airport cannot be the same.");
  }
}

function SearchFormMain() {
  const navigate = useNavigate();
  const isloading = useSelector((state) => state.loading?.isLoading);

  //STATE
  const [DepAirport, setDepAirport] = useState("--Not Selected--");
  const [DesAirport, setDesAirport] = useState("--Not Selected--");

  const handleDepAirportSelect = (airportIATACode) => {
    airportIATACode = airportIATACode.split(" ")[1];
    setDepAirport(airportIATACode);
  };

  const handleDesAirportSelect = (airportIATACode) => {
    airportIATACode = airportIATACode.split(" ")[1];
    setDesAirport(airportIATACode);
  };
  // FORM
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      dispatch(loadingStart());
      validateInput(DepAirport, DesAirport);

      const data = await getAirportSchedule(DepAirport, DesAirport);

      //insert airline full name into redux flights state
      const airlineArr = await airlineFullNameArr(data);

      dispatch(setFlight(airlineArr));

      navigate("/flightSearch/searchResults");
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(loadingComplete());
    }
  }

  return (
    <>
      <SearchFormTitle></SearchFormTitle>
      <form onSubmit={handleSubmit}>
        <Container>
          <div className="formHeader border-bottom border-1 border-secondary">
            <Row></Row>
          </div>

          <div className="formBody pt-5 pb-0 py-sm-5 text-secondary">
            <Row className="mb-md-3">
              <Col
                xs={12}
                md={6}
                className="fs-4 d-flex ps-md-1 ps-lg-4 mb-5 mb-sm-4 mb-md-3 mb-lg-0"
              >
                <label
                  htmlFor="arrival_location"
                  className="fs-5 col-3 w-lg-20 d-flex my-auto me-5"
                >
                  Departure<span className="text-danger">*</span>
                </label>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    id="dropdownMenuDepartureLocation"
                  >
                    {DepAirport}
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    <Dropdown.Item
                      href="#"
                      key="🇹🇼 TPE"
                      onClick={() => handleDepAirportSelect("🇹🇼 TPE")}
                    >
                      {flagemojiToPNG("🇹🇼")} TPE
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    {airportIATACodes.map((airportIATACode) => {
                      return (
                        <Dropdown.Item
                          href="#"
                          key={airportIATACode}
                          onClick={() =>
                            handleDepAirportSelect(airportIATACode)
                          }
                        >
                          {flagemojiToPNG(airportIATACode.split(" ")[0])}{" "}
                          {airportIATACode.split(" ")[1]}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>

              <Col
                xs={12}
                md={6}
                className="fs-4 d-flex ps-md-1 ps-lg-4 mb-5 mb-sm-4 mb-md-3 mb-lg-0"
              >
                <label
                  htmlFor="arrival_location"
                  className="fs-5 col-3 w-lg-20 d-flex my-auto me-5"
                >
                  Destination<span className="text-danger">*</span>
                </label>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    id="dropdownMenuDepartureLocation"
                  >
                    {DesAirport}
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    <Dropdown.Item
                      href="#"
                      key="🇹🇼 TPE"
                      onClick={() => handleDesAirportSelect("🇹🇼 TPE")}
                    >
                      {flagemojiToPNG("🇹🇼")} TPE
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    {airportIATACodes.map((airportIATACode) => {
                      return (
                        <Dropdown.Item
                          href="#"
                          key={airportIATACode}
                          onClick={() =>
                            handleDesAirportSelect(airportIATACode)
                          }
                        >
                          {flagemojiToPNG(airportIATACode.split(" ")[0])}{" "}
                          {airportIATACode.split(" ")[1]}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </div>

          {/* <DisableInput></DisableInput> */}

          <div className="formFooter d-flex justify-content-center">
            <Button
              variant="warning"
              type="submit"
              className="text-secondary py-2 px-4 fs-5 fw-bold rounded-0"
              disabled={isloading}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Search
            </Button>
          </div>
        </Container>
      </form>
    </>
  );
}

export default SearchFormMain;
