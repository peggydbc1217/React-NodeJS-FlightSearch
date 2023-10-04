const express = require("express");
const airportRouter = express.Router();

const {
  getAirportSchedule,
} = require("../controllers/airportScheduleController");

airportRouter.route("/").get(getAirportSchedule);

module.exports = airportRouter;
