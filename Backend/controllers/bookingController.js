const Booking = require("../models/bookingModel");
const factory = require("./handlerfactory");
const Stripe = require("stripe");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

//修改tour成flight 以及price
exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  const { tour, user, price } = req.query; //query string
  if (!tour || !user || !price) return next();
  await Booking.create({ tour, user, price });

  const clientUrl = "http://127.0.0.1:5000/";
  res.redirect(clientUrl);
  // res.redirect(req.originalUrl.split('?')[0]); //remove the query string
});

//修改tour成flight 以及price
exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  // 1) Get the currently booked tour
  const booking = await Booking.findById(req.params.bookingId);

  // 2) Create checkout session
  // const clientUrl = `${req.headers.referer}?booking=${req.params.bookingId}&user=${req.user.id}&price=${booking.price}`;
  const clientUrl = `${req.headers.referer}`;

  // const orgSuccessUrl = `${req.protocol}://${req.get("host")}/`; // not secure, but for testing

  const orgSuccessUrl = `${req.headers.referer}flightSearch/bookingCompleted`;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: orgSuccessUrl,
    cancel_url: clientUrl,
    customer_email: req.user.email,
    client_reference_id: req.params.bookingId, //passing the tour id to the checkout session
    line_items: [
      {
        quantity: booking.amount,
        price_data: {
          currency: "usd",
          unit_amount: booking.price * 100,
          product_data: {
            name: `${booking.flight_iata} - ${booking.dep_iata} to ${booking.arr_iata}`,
            description: `Class: ${booking.flightClass} | ${booking.amount} passengers`,
            images: [
              `https://media.istockphoto.com/id/155439315/photo/passenger-airplane-flying-above-clouds-during-sunset.jpg?s=612x612&w=0&k=20&c=LJWadbs3B-jSGJBVy9s0f8gZMHi2NvWFXa3VJ2lFcL0=`,
            ],
          },
        },
      },
    ],
    mode: "payment",
  });

  // // 3) Create session as response
  res.status(200).json({
    status: "success",
    session,
  });
});

exports.getMyBookings = catchAsync(async (req, res, next) => {
  // req.params.id = req.user.id;

  const bookings = await Booking.find({ user: req.user.id }).populate("user");

  // console.log(bookings);

  if (!bookings) return next(new AppError("No booking found", 404));

  res.status(200).json({
    status: "success",
    results: bookings.length,
    data: { bookings },
  });
});

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
exports.deleteAllBooking = factory.deleteAll(Booking);
