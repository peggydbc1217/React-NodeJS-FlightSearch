import { FETCH_CITY_URL } from "./constant";
import axios from "axios";

export function formatDate(dateString) {
  const originalDate = new Date(dateString);

  // Format the date to 'yyyy/MM/dd'
  const year = originalDate.getFullYear();
  const month = String(originalDate.getMonth() + 1).padStart(2, "0");
  const day = String(originalDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}/${month}/${day}`;

  // Format the time to 'HH:mm'
  const hours = String(originalDate.getHours()).padStart(2, "0");
  const minutes = String(originalDate.getMinutes()).padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  // Get the time zone offset in minutes and convert it to hours
  const timeZoneOffsetMinutes = originalDate.getTimezoneOffset();
  const timeZoneOffsetHours = Math.abs(timeZoneOffsetMinutes) / 60;
  const timeZonePrefix =
    timeZoneOffsetMinutes >= 0
      ? `GMT+${timeZoneOffsetHours}`
      : `GMT-${timeZoneOffsetHours}`;

  return {
    date: formattedDate,
    time: formattedTime,
    timeZone: timeZonePrefix,
  };
}

export function minutesToHoursAndMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}min`;
  } else if (remainingMinutes === 0) {
    return `${hours}hr`;
  } else {
    return `${hours}hr ${remainingMinutes}min`;
  }
}

//insert airline full name into redux flights state
export const airlineFullNameArr = async (data) => {
  //dynamic import airline-codes

  let airlines = await import("airline-codes");

  return data.map((airplane, _) => {
    let airlineFullName = airlines.default
      .findWhere({ iata: airplane.airline_iata })
      .get("name");

    if (
      airlineFullName === undefined ||
      airlineFullName?.startsWith("MyTravel")
    ) {
      airlineFullName = "Unknown Airways";
    }

    return { ...airplane, airlineFullName };
  });
};

export const fetchCityData = async (lat, lng) => {
  try {
    const res = await axios.get(
      `${FETCH_CITY_URL}latitude=${lat}&longitude=${lng}`
    );

    console.log(res);

    return res;
  } catch (err) {
    throw new Error(err.message);
  }
};

export function isTimeBetween7PMand7AM() {
  const taiwanCurrentTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Taipei",
  });

  // Convert the string to a Date object
  const currentTime = new Date(taiwanCurrentTime);

  const hour = currentTime.getHours();

  return hour >= 19 || hour < 7;
}
