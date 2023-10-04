import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        searchParams.set("lat", pos.coords.latitude);
        searchParams.set("lng", pos.coords.longitude);
        setSearchParams(searchParams);

        // setPosition({
        //   lat: pos.coords.latitude,
        //   lng: pos.coords.longitude,
        // });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, error, getPosition };
}
