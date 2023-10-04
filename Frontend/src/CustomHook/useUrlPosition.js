import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat") || 24.8;
  const lng = searchParams.get("lng") || 121.1;
  const distance = searchParams.get("distance");

  //for real time flight
  const speed = searchParams.get("speed") || 0;
  const elevation = searchParams.get("elevation") || 0;
  const flight_iata = searchParams.get("flight_iata") || "";
  const airline_iata = searchParams.get("airline_iata") || "";
  const dep_iata = searchParams.get("dep_iata") || "";
  const arr_iata = searchParams.get("arr_iata") || "";
  const status = searchParams.get("status") || "";
  const dir = searchParams.get("dir") || "";
  const alt = searchParams.get("alt") || "";

  return [
    lat,
    lng,
    distance,
    speed,
    elevation,
    flight_iata,
    airline_iata,
    dep_iata,
    arr_iata,
    status,
    dir,
    alt,
  ];
}
