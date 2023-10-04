const catchAsync = require("../utils/catchAsync");
const AirportIata = require("../models/AirportIataModel");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

exports.createAirportIata = factory.createOne(AirportIata);
exports.getAirportIata = factory.getOne(AirportIata);
exports.deleteAllAirportIata = factory.deleteAll(AirportIata);

exports.getAllAirportIatas = catchAsync(async (req, res) => {
  const char = req.query.char || "";

  if (char === "") {
    return res.status(204).end();
  }

  // Define a regular expression for filtering 'iata' field starting with the specified character
  const regex = new RegExp(`^${char}`, "i");

  // Find distinct 'iata' values that match the regex
  const query = await AirportIata.distinct("iata", { iata: regex });

  // Query for documents with 'iata' values in the distinctIatas array
  const doc = await AirportIata.find({ iata: { $in: query } })
    .sort({ iata: 1 })
    .limit(10);

  res.status(200).json({
    status: "success",
    results: doc.length,
    data: { doc },
  });
});
