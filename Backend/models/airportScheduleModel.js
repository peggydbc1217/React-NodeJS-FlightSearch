const mongoose = require("mongoose");

const airportScheduleSchema = new mongoose.Schema({
  airline_iata: String,
  airline_icao: String,
  flight_iata: String,
  flight_icao: String,
  flight_number: String,
  dep_iata: String,
  dep_icao: String,
  dep_terminal: String,
  dep_gate: String,
  dep_time: Date,
  dep_time_utc: Date,
  dep_estimated: Date,
  dep_estimated_utc: Date,
  dep_actual: Date,
  dep_actual_utc: Date,
  arr_iata: String,
  arr_icao: String,
  arr_terminal: String,
  arr_gate: String,
  arr_baggage: String,
  arr_time: Date,
  arr_time_utc: Date,
  arr_estimated: Date,
  arr_estimated_utc: Date,
  cs_airline_iata: String,
  cs_flight_number: String,
  cs_flight_iata: String,
  status: String,
  duration: Number,
  delayed: Number,
  dep_delayed: Number,
  arr_delayed: Number,
  aircraft_icao: String,
  arr_time_ts: Number,
  dep_time_ts: Number,
  arr_estimated_ts: Number,
  dep_estimated_ts: Number,
  dep_actual_ts: Number,
});

const AirportSchedule = mongoose.model(
  "AirportSchedule",
  airportScheduleSchema
);

module.exports = AirportSchedule;
