const catchAsync = require("../utils/catchAsync");
const Favorite = require("../models/FavoriteModel");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

exports.createFavorite = factory.createOne(Favorite);
exports.getFavorite = factory.getOne(Favorite);
exports.getAllFavorites = factory.getAll(Favorite);
exports.updateFavorite = factory.updateOne(Favorite);
exports.deleteFavorite = factory.deleteOne(Favorite);
exports.deleteAllFavorite = factory.deleteAll(Favorite);

exports.getMyFavorites = catchAsync(async (req, res, next) => {
  const favorites = await Favorite.find({ user: req.user.id });
  res.status(200).json({
    status: "success",
    results: favorites.length,
    data: {
      favorites,
    },
  });
});

exports.checkIfFavoriteExists = catchAsync(async (req, res, next) => {
  const favorite = await Favorite.findOne({
    user: req.user.id,
    flight_iata: req.body.flight_iata,
  });
  if (favorite) {
    return next(new AppError("Favorite already exists, ", 400));
  }

  next();
});
