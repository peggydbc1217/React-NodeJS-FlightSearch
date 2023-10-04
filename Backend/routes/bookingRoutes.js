const express = require("express");
const BookingRouter = express.Router();
const {
  getCheckoutSession,
  getAllBookings,
  createBooking,
  getBooking,
  getMyBookings,
  updateBooking,
  deleteBooking,
  deleteAllBooking,
} = require("../controllers/bookingController");

const { protect, restrictTo } = require("../controllers/authController");
const Booking = require("../models/bookingModel");
// const { protect, isLoggedIn } = require('../controllers/authController');

// router.get("/checkout-session/:tourId", protect, getCheckoutSession);
// 記得補回protect
BookingRouter.get("/checkout-session/:bookingId", protect, getCheckoutSession);

// BookingRouter.use(protect);
BookingRouter.route("/mybookings").get(protect, getMyBookings);
BookingRouter.route("/").get(getAllBookings);
BookingRouter.route("/").post(protect, createBooking);
BookingRouter.route("/deleteAll").delete(
  protect,
  restrictTo("admin"),
  deleteAllBooking
);

BookingRouter.route("/:id")
  .get(getBooking)
  .patch(updateBooking)
  .delete(deleteBooking);

module.exports = BookingRouter;
