import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAirportDB } from "../../services/airLabApi";
import { toast } from "react-hot-toast";
import { loadingComplete, loadingStart } from "../Loading/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../ui/Spinner";

function AirportItem({ airport }) {
  const { iata_code, lat, lng, city, country_code, distance, name } = airport;
  const [show, setShow] = useState(false);
  const [airportInfo, setAirportInfo] = useState({});

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading?.isLoading) || false;

  const handleFetchAirportInfo = async () => {
    dispatch(loadingStart());
    setShow((show) => !show);
    try {
      const res = await getAirportDB(iata_code);
      setAirportInfo(res);
    } catch (err) {
      toast.error(err.message);
    } finally {
      dispatch(loadingComplete());
    }
  };

  return (
    <div className="d-flex flex-column border p-3 mt-3">
      {/* <img
        src="/images/searchFormLowerBg.jpg"
        alt=""
        className="w-100 "
        style={{ height: "150px" }}
      /> */}

      <ul className="w-100  g-3 mb-0 list-unstyled">
        <li>
          <h4 className="mb-lg-1 mb-0 fw-bold fs-lg-4 fs-6 text-secondary">
            {name} {`(${iata_code})`}
          </h4>
        </li>
        <li>
          <h4 className="mb-lg-1 mb-0  fs-lg-4 fs-6 text-secondary">
            Distance: <span className="text-info">{distance} Km</span>
          </h4>
        </li>
        <li>
          <p className="mb-lg-1 mb-0 fs-lg-6 fs-8">
            {" "}
            <span
              className={`fi fi-${country_code.toLocaleLowerCase()} w-20 border `}
            ></span>{" "}
            {city}:{" "}
            <span className="text-info">
              {lat}, {lng}
            </span>
          </p>
        </li>
        <Button
          variant="warning"
          className="rounded-0 ms-auto me-auto w-100"
          onClick={handleFetchAirportInfo}
        >
          More Info
        </Button>
      </ul>
      {
        <Modal
          size="lg"
          show={show}
          onHide={() => setShow((show) => !show)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{name}</Modal.Title>
          </Modal.Header>
          {isLoading ? (
            <Spinner></Spinner>
          ) : (
            <Modal.Body>
              <div className="">
                <ul className="list-unstyled d-flex justify-content-center">
                  {airportInfo.website && (
                    <li className={`$`}>
                      <Link
                        to={airportInfo.website}
                        className={`link-white h5 py-1 px-2`}
                        target="_blank"
                      >
                        <img
                          src={`/images/Nearairport/web.png`}
                          style={{ height: "48px" }}
                          alt="web"
                        />
                      </Link>
                    </li>
                  )}

                  {airportInfo.facebook && (
                    <li className={`$`}>
                      <Link
                        to={`http://${airportInfo.facebook}`}
                        className={`link-white h5 py-1 px-2`}
                        target="_blank"
                      >
                        <img
                          src={`/images/Nearairport/facebook.png`}
                          style={{ height: "48px" }}
                          alt="facebook"
                        />
                      </Link>
                    </li>
                  )}

                  {airportInfo.instagram && (
                    <li className={`$`}>
                      <Link
                        to={`http://${airportInfo.instagram}`}
                        className={`link-white h5 py-1 px-2`}
                        target="_blank"
                      >
                        <img
                          src={`/images/Nearairport/instagram.png`}
                          style={{ height: "48px" }}
                          alt="instagram"
                        />
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
              <p className="h5 text-center font-weight-bold mb-3">
                Phone:{" "}
                {airportInfo.phone ? (
                  <a href={`tel:${airportInfo.phone}`}>{airportInfo.phone}</a>
                ) : (
                  "No data"
                )}
              </p>

              <p className="h5 text-center font-weight-bold mb-3">
                Email:{" "}
                {airportInfo.email ? (
                  <a href={`mailto:${airportInfo.email}`}>
                    {airportInfo.email}
                  </a>
                ) : (
                  "No data"
                )}
              </p>
            </Modal.Body>
          )}
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShow((show) => !show)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </div>
  );
}

export default AirportItem;
