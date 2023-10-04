const express = require("express");
const AirLabsRouter = express.Router();

const {
  getRealTimeFlightSuggestions,
  getRealTimeFlights,
  getAirportSchedule,
  getNearAirports,
  getAirportDB,
  getAirportDelayedFlights,
  getAirportFullNameAndCountry,
} = require("../controllers/airLabsController");

AirLabsRouter.route("/getRealTimeFlightSuggestions").get(
  getRealTimeFlightSuggestions
);

AirLabsRouter.route("/getAirportSchedule").get(getAirportSchedule);
AirLabsRouter.route("/getRealTimeFlights").get(getRealTimeFlights);
AirLabsRouter.route("/getNearAirports").get(getNearAirports);
AirLabsRouter.route("/getAirportDB").get(getAirportDB);
AirLabsRouter.route("/getAirportDelayedFlights").get(getAirportDelayedFlights);
AirLabsRouter.route("/getAirportFullNameAndCountry").get(
  getAirportFullNameAndCountry
);

module.exports = AirLabsRouter;
