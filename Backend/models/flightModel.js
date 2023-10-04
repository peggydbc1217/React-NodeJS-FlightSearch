const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  flight_iata: String,
  flight_icao: String,
  dep_iata: String,
  dep_icao: String,
  arr_iata: String,
  arr_icao: String,
  dep_time: Date,
  arr_time: Date,
  dep_terminal: String,
  arr_terminal: String,
  dep_gate: String,
  arr_gate: String,
  duration: Number,
  dep_airport_name: String,
  arr_airport_name: String,
});

const Flight = mongoose.model("Flight", flightSchema);
module.exports = Flight;
