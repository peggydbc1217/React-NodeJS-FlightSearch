const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const axios = require("axios");

exports.getAirportSchedule = catchAsync(async (req, res) => {
  const { dep_iata, arr_iata } = req.query;

  try {
    const url = `https://airlabs.co/api/v9/schedules?dep_iata=${dep_iata}&arr_iata=${arr_iata}&api_key=${process.env.AIRLABS_KEY}&_fields=airline_iata,flight_iata,dep_terminal,dep_iata,dep_time,arr_iata,arr_time,status,duration,dep_time_ts`;
    const response = await axios.get(url);

    if (response.data.error)
      throw new AppError(response.data.error.message, 400);

    const airportSchedule = response.data.response;

    res.status(response.status).json({
      status: response.status,
      data: airportSchedule,
    });
  } catch (err) {
    throw new AppError(err.message, err.statusCode);
  }
});

exports.getAirportFullNameAndCountry = catchAsync(async (req, res) => {
  try {
    const { flight_iata } = req.query;
    const url = `https://airlabs.co/api/v9/flight?flight_iata=${flight_iata}&api_key=${process.env.AIRLABS_KEY}`;

    const response = await axios.get(url);
    if (response.data.error)
      throw new AppError(response.data.error.message, 400);

    const airportInfo = response.data.response;

    res.status(response.status).json({
      status: response.status,
      data: airportInfo,
    });
  } catch (err) {
    throw new AppError(err.message, err.statusCode);
  }
});

exports.getAirportDelayedFlights = catchAsync(async (req, res) => {
  try {
    const { type, dep_iata, arr_iata } = req.query;

    const depQuery = dep_iata ? `dep_iata=${dep_iata}` : "";
    const arrQuery = arr_iata ? `arr_iata=${arr_iata}` : "";

    const url = `https://airlabs.co/api/v9/delays?delay=60&${depQuery}&${arrQuery}&type=${type}&api_key=${process.env.AIRLABS_KEY}`;

    const response = await axios.get(url);

    if (response.data.error)
      throw new AppError(response.data.error.message, 400);

    const delayedFlights = response.data.response;

    res.status(response.status).json({
      status: response.status,
      data: delayedFlights,
    });
  } catch (err) {
    throw new AppError(err.message, err.statusCode);
  }
});

exports.getAirportDB = catchAsync(async (req, res) => {
  const { iata_code } = req.query;

  try {
    const url = `https://airlabs.co/api/v9/airports?iata_code=${iata_code}&api_key=${process.env.AIRLABS_KEY}`;

    const response = await axios.get(url);
    if (response.data.error)
      throw new AppError(response.data.error.message, 400);

    const airportInfo = response.data.response[0];

    res.status(response.status).json({
      status: response.status,
      data: airportInfo,
    });
  } catch (err) {
    throw new AppError(err.message, err.statusCode);
  }
});

exports.getNearAirports = catchAsync(async (req, res) => {
  const { lat, lng, distance } = req.query;

  try {
    const url = `https://airlabs.co/api/v9/nearby?lat=${lat}&lng=${lng}&distance=${distance}&api_key=${process.env.AIRLABS_KEY}`;

    const response = await axios.get(url);

    if (response.data.error)
      throw new AppError(response.data.error.message, 400);

    const nearAirports = response.data.response.airports;

    res.status(response.status).json({
      status: response.status,
      data: nearAirports,
    });
  } catch (err) {
    throw new AppError(err.message, err.statusCode);
  }
});

exports.getRealTimeFlights = catchAsync(async (req, res) => {
  const { flight_iata } = req.query;
  try {
    const url = `https://airlabs.co/api/v9/flights?flight_iata=${flight_iata.toUpperCase()}&api_key=${
      process.env.AIRLABS_KEY
    }`;

    const response = await axios.get(url);

    if (response.data.error)
      throw new AppError(response.data.error.message, 400);

    const realTimeFlights = response.data.response;

    if (realTimeFlights.length === 0)
      throw new AppError("No flight found or flight is not in the air", 404);

    res.status(response.status).json({
      status: response.status,
      data: realTimeFlights,
    });
  } catch (err) {
    throw new AppError(err.message, err.statusCode);
  }
});

exports.getRealTimeFlightSuggestions = catchAsync(async (req, res) => {
  const { dep_iata, arr_iata } = req.query;

  const url = `https://airlabs.co/api/v9/flights?dep_iata=${dep_iata}&arr_iata=${arr_iata}&api_key=${process.env.AIRLABS_KEY}`;

  try {
    const response = await axios.get(url);

    if (response.data.error)
      throw new AppError(response.data.error.message, 400);

    const realTimeFlights = response.data.response;

    res.status(response.status).json({
      status: response.status,
      data: realTimeFlights,
    });
  } catch (err) {
    throw new AppError(err.message, err.statusCode);
  }
});
