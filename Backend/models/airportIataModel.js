const mongoose = require("mongoose");

const airportIataSchema = new mongoose.Schema({
  country_code: String,
  iata: String,
  airport: String,
  lat: String,
  lng: String,
});

const AirportIata = mongoose.model("AirportIata", airportIataSchema);

module.exports = AirportIata;
