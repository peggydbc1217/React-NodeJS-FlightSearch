const express = require("express");
const AirportIataRouter = express.Router();

const { getAllAirportIatas } = require("../controllers/airportIataController");

AirportIataRouter.route("/").get(getAllAirportIatas);

module.exports = AirportIataRouter;
