import { useState } from "react";
import styles from "./NearAirportForm.module.scss";
import { Button, Dropdown } from "react-bootstrap";
import Error from "../../pages/Error";

import { v4 as uuidv4 } from "uuid";
import { useGeolocation } from "../../CustomHook/useGeolocation";
import { useSearchParams } from "react-router-dom";

function NearAirportForm() {
  const [distance, setDistance] = useState(100);

  const { isLoading: isLoadingPosition, getPosition, error } = useGeolocation();

  const [searchParams, setSearchParams] = useSearchParams();

  //sync searchParams with geoLocationPosition(from custom hooks)
  // useEffect(() => {
  //   if (userLocationPosition) {
  //     setSearchParams({
  //       distance: distance,
  //       lat: userLocationPosition.lat,
  //       lng: userLocationPosition.lng,
  //     });
  //   }
  // }, [distance, userLocationPosition, setSearchParams]);

  if (error) {
    return <Error message={error}></Error>;
  }

  return (
    <>
      <div
        className={`${styles["bg-cover"]} ${styles["searchbg"]} border p-lg-5 p-3`}
      >
        <h3 className=" text-secondary fw-bold cursor-pointer">
          🌍Where are you?
        </h3>
        <h5>
          Click on the map below to sepcify a location{" "}
          {
            <div className="d-flex mt-2">
              <p className="mb-0">or</p>
              <Button
                variant="warning"
                className={`${styles["btn-hover"]} rounded-0 text-secondary fw-bold ms-3`}
                onClick={getPosition}
              >
                {isLoadingPosition ? "Loading" : "Use your Position"}
              </Button>
            </div>
          }
        </h5>

        <h3 className=" fw-bold text-secondary cursor-pointer mt-3">
          🌐 Please also select a searching distance(Diameter)
        </h3>
        <div className="d-flex">
          <Dropdown>
            <Dropdown.Toggle
              variant="secondary"
              id="dropdownMenuDepartureLocation"
            >
              {distance}km
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ maxHeight: "250px", overflowY: "auto" }}>
              {Array.from({ length: 10 }, (_, i) => (i + 1) * 100).map(
                (number) => {
                  const id = uuidv4();
                  return (
                    <Dropdown.Item
                      href="#"
                      key={id}
                      onClick={() => {
                        setDistance(number);
                        searchParams.set("distance", number);
                        setSearchParams(searchParams);
                      }}
                    >
                      {`${number}`}km
                    </Dropdown.Item>
                  );
                }
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
}

export default NearAirportForm;
