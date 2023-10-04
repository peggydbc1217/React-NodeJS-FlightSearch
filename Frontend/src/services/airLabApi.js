import axios from "axios";
import { isTimeBetween7PMand7AM } from "./otherApi";
import { SERVER_URL } from "./constant";

export async function getAirportSchedule(dep_iata, arr_iata) {
  try {
    const res = await axios.get(
      `${SERVER_URL}/flightSearch/v1/airLabs/getAirportSchedule?dep_iata=${dep_iata}&arr_iata=${arr_iata}`
    );

    const flights = res.data.data;

    if (flights.length === 0) {
      throw new Error(
        "No flights found, or there may not be a direct flight available. Please try another airport"
      );
    }

    const flightsFromNow = flights.filter((flight) => {
      if (
        flight.dep_time === null ||
        flight.airline_iata === null ||
        flight.fligh_iata === null
      )
        return false;
      //add price according to duration
      flight.price = calculateFlightPrice(flight.duration);

      //check if flight is in the future
      const depTime = new Date(flight.dep_time).getTime();
      return depTime > Date.now();
    });

    if (flightsFromNow.length === 0) {
      throw new Error(
        "No flights found, it seems today's flights have all departed. Please try another airport"
      );
    }

    return flightsFromNow;
  } catch (err) {
    // const serverErrorMessage = err.response?.data?.message;
    // const errorMessage = serverErrorMessage || err.message;
    const errMessage =
      err.response?.data?.message || err.message || "Failed to fetch data";
    throw new Error(errMessage);
  }
}

//getAirportFullNameAndCountry
export async function getAirportFullNameAndCountry(flight_iata) {
  try {
    const res = await axios.get(
      `${SERVER_URL}/flightSearch/v1/airLabs/getAirportFullNameAndCountry?flight_iata=${flight_iata}`
    );

    return res.data.data;
  } catch (err) {
    const errMessage =
      err.response?.data?.message || err.message || "Failed to fetch data";
    throw new Error(errMessage);
  }
}

export function calculateFlightPrice(duration) {
  const basePrice = 100;
  const ratePerMinute = 1;

  // Calculate the price based on the duration
  const price = basePrice + duration * ratePerMinute;

  // Ensure the price is not negative
  return price >= 0 ? price.toFixed(2) : "Invalid duration";
}

export async function getAirportDelayedFlights(type, iata) {
  let url;

  if (type === "departures") {
    url = `${SERVER_URL}/flightSearch/v1/airLabs/getAirportDelayedFlights?delay=60&type=${type}&dep_iata=${iata}}`;
  } else {
    url = `${SERVER_URL}/flightSearch/v1/airLabs/getAirportDelayedFlights?delay=60&type=${type}&arr_iata=${iata}}`;
  }

  try {
    const res = await axios.get(url);
    return res;
  } catch (err) {
    const errMessage =
      err.response?.data?.message || err.message || "Failed to fetch data";
    throw new Error(errMessage);
  }
}

export async function getAirportDB(flight_iata) {
  try {
    const res = await axios.get(
      `${SERVER_URL}/flightSearch/v1/airLabs/getAirportDB?iata_code=${flight_iata}`
    );

    const airportInfo = res.data.data;

    return airportInfo;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getNearAirports(data) {
  const { lat, lng, distance } = data;
  try {
    const res = await axios.get(
      `${SERVER_URL}/flightSearch/v1/airLabs/getNearAirports?lat=${lat}&lng=${lng}&distance=${distance}`
    );

    return res;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getRealTimeFlights(flight_iata) {
  try {
    const url = `${SERVER_URL}/flightSearch/v1/airLabs/getRealTimeFlights?flight_iata=${flight_iata.toUpperCase()}`;

    const res = await axios.get(url);

    const realTimeFlight = res.data.data[0];

    return realTimeFlight;
  } catch (err) {
    const errMessage = err.response?.data?.message || "Failed to fetch data";
    throw new Error(errMessage);
  }
}

// use to fetch flight that is currently in the air, and show the flight_iata to customer.

export async function getRealTimeFlightSuggestions() {
  let dep_iata = "TPE";
  let arr_iata = "NRT";

  if (isTimeBetween7PMand7AM()) {
    // if it is between 7pm and 7am, return a flight from BCN to FCO
    dep_iata = "JFK";
    arr_iata = "SFO";
  }

  try {
    const res = await axios.get(
      `${SERVER_URL}/flightSearch/v1/airLabs/getRealTimeFlightSuggestions?dep_iata=${dep_iata}&arr_iata=${arr_iata}`
    );

    const randomFlights = res.data.data;

    return randomFlights;
  } catch (err) {
    const errMessage = err.response?.data?.message || "Failed to fetch data";
    throw new Error(errMessage);
  }
}
