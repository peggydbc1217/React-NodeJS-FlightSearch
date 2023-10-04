const express = require("express");
const FavoriteRouter = express.Router();

const {
  getAllFavorites,
  createFavorite,
  getFavorite,
  getMyFavorites,
  updateFavorite,
  deleteFavorite,
  deleteAllFavorite,
  checkIfFavoriteExists,
} = require("../controllers/favoriteController");

const { protect, restrictTo } = require("../controllers/authController");

FavoriteRouter.use(protect);
FavoriteRouter.route("/myFavorites").get(getMyFavorites);
FavoriteRouter.route("/").get(getAllFavorites);
FavoriteRouter.route("/").post(checkIfFavoriteExists, createFavorite);

FavoriteRouter.route("/deleteAll").delete(
  restrictTo("admin"),
  deleteAllFavorite
);

FavoriteRouter.route("/:id")
  .get(getFavorite)
  .patch(updateFavorite)
  .delete(deleteFavorite);

module.exports = FavoriteRouter;
