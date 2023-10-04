const AirportSchedule = require("../models/airportScheduleModel");
const catchAsync = require("../utils/catchAsync");

exports.getAirportSchedule = catchAsync(async (req, res, next) => {
  const airports = await AirportSchedule.find();
  res.status(200).json({
    status: "success",
    data: {
      airports,
    },
  });
});
