const catchAsync = require("../utils/catchAsync");
const Flight = require("../models/flightModel");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

exports.createFlight = factory.createOne(Flight);
exports.getFlight = factory.getOne(Flight);
exports.getAllFlights = factory.getAll(Flight);
exports.updateFlight = factory.updateOne(Flight);
exports.deleteFlight = factory.deleteOne(Flight);
