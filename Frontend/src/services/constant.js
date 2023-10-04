export const airportIATACodes = [
  "🇳🇱 AMS",
  "🇺🇸 ATL",
  "🇪🇸 BCN",
  "🇹🇭 BKK",
  "🇮🇳 BOM",
  "🇨🇳 CAN",
  "🇫🇷 CDG",
  "🇧🇷 CGH",
  "🇮🇩 CGK",
  "🇨🇳 CTU",
  "🇮🇳 DEL",
  "🇺🇸 DEN",
  "🇺🇸 DFW",
  "🇦🇪 DXB",
  "🇮🇹 FCO",
  "🇩🇪 FRA",
  "🇨🇳 HGH",
  "🇭🇰 HKG",
  "🇯🇵 HND",
  "🇰🇷 ICN",
  "🇹🇷 IST",
  "🇺🇸 JFK",
  "🇨🇳 KMG",
  "🇲🇾 KUL",
  "🇺🇸 LAX",
  "🇺🇸 LGA",
  "🇬🇧 LGW",
  "🇬🇧 LHR",
  "🇪🇸 MAD",
  "🇲🇽 MEX",
  "🇺🇸 MSP",
  "🇩🇪 MUC",
  "🇯🇵 NRT",
  "🇺🇸 OGG",
  "🇺🇸 ORD",
  "🇫🇷 ORY",
  "🇨🇳 PEK",
  "🇨🇳 PVG",
  "🇺🇸 SEA",
  "🇨🇳 SHA",
  "🇺🇸 SFO",
  "🇸🇬 SIN",
  "🇷🇺 SVO",
  "🇨🇳 SZV",
  "🇨🇳 SZX",
  "🇨🇳 TNA",
  "🇦🇹 VIE",
  "🇨🇳 XIY",
];

//HEADER AND FOOTER LINKS
export const FunctionOptions = [
  {
    name: "Flight Search",
    path: "/flightSearch/searchForm",
  },
  {
    name: "Delayed Flights",
    path: "/delayedFlights",
  },
  {
    name: "Aircraft Coordinates",
    path: "/realTimeFlight",
  },
  {
    name: "Nearby Airports",
    path: "/nearAirports?distance=100&lat=24.8&lng=121.1",
  },
];

export const loginOptions = [
  {
    name: "Login",
    path: "/user/login",
  },
  {
    name: "Sign Up",
    path: "/user/signup",
  },
];

export const logoutOptions = [
  {
    name: "Logout",
    path: "/",
  },
  {
    name: "Account",
    path: "/account",
  },
];

export const accountPageOptions = [
  {
    name: "My Favorites",
    path: "/account/myFavorite",
  },
  {
    name: "My Orders",
    path: "/account/myOrder",
  },
  // {
  //   name: "Edit Information",
  //   path: "/account/edit",
  // },
  {
    name: "Change Password",
    path: "/account/changePassword",
  },
];

// Real Time Flight Sear params
export const queryParamsToSet = [
  "flight_iata",
  "airline_iata",
  "flag",
  "lat",
  "lng",
  "alt",
  "dep_iata",
  "arr_iata",
  "speed",
  "status",
  "dir",
  "alt",
];

//airportschedule
// export const AIRPORT_SCHEDULE_URL = "https://airlabs.co/api/v9/schedules?";
// export const AIRPORT_FLIGHT_URL = "https://airlabs.co/api/v9/flight?";
// export const AIRPORT_DELAYED_URL = "https://airlabs.co/api/v9/delays?";
// export const AIRPORT_DB_URL = "https://airlabs.co/api/v9/airports?";
// export const AIRPORT_NEARBY_URL = "https://airlabs.co/api/v9/nearby?";

export const FETCH_CITY_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client?";

// export const BASE_URL = "https://flight-ease.vercel.app/";

export const SERVER_URL = "https://flightease-39d0be63c8d5.herokuapp.com";
// export const SERVER_URL = "http://127.0.0.1:3000";

//PAGINATION
export const PAGE_PER_ROW = 5;
