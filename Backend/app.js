const express = require("express");
app = express();
app.use(express.json());

//ERRORS
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

//ROUTERS
const userRouter = require("./routes/userRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const favoriteRouter = require("./routes/favoriteRoutes");
const airportRouter = require("./routes/airportScheduleRoute");
const airportIataRouter = require("./routes/airportIataRoutes");
const airLabsRouter = require("./routes/airLabsRoutes");

//SETUP SECURITY
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongosanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//CORS

const corsOptions = {
  // origin: "http://127.0.0.1:5175", //included origin as true
  origin: "https://flight-ease.vercel.app",
  credentials: true, //included credentials as true
};

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use(cors(corsOptions));

const limiter = rateLimit({
  max: 100,
  windows: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// SETUP CORS RULES
const scriptSrcUrls = [
  "https://api.tiles.mapbox.com/",
  "https://api.mapbox.com/",
  "https://*.cloudflare.com",
  "https://js.stripe.com/v3/",
  "https://checkout.stripe.com",
];
const styleSrcUrls = [
  "https://api.mapbox.com/",
  "https://api.tiles.mapbox.com/",
  "https://fonts.googleapis.com/",
  "https://www.myfonts.com/fonts/radomir-tinkov/gilroy/*",
  " checkout.stripe.com",
];
const connectSrcUrls = [
  // "https://*.mapbox.com/",
  // "https://*.cloudflare.com/",
  // "http://127.0.0.1:3000/",
  // "http://127.0.0.1:*/",
  // "ws://127.0.0.1:*/",
  // "ws://localhost:*/",
  // "*.stripe.com/",
  "https://flight-ease.vercel.app",
];

const fontSrcUrls = ["fonts.googleapis.com", "fonts.gstatic.com"];

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'", ...connectSrcUrls],
      scriptSrc: ["'self'", ...scriptSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      workerSrc: ["'self'", "blob:"],
      objectSrc: [],
      imgSrc: ["'self'", "blob:", "data:"],
      fontSrc: ["'self'", ...fontSrcUrls],
      frameSrc: ["*.stripe.com", "*.stripe.network"],
    },
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(mongosanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ], // allow duplicate query
  })
);

app.use(cookieParser());

app.use("/flightSearch/v1/user", userRouter);
app.use("/flightSearch/v1/booking", bookingRouter);
app.use("/flightSearch/v1/favorite", favoriteRouter);
// This is just a test.
app.use("/flightSearch/v1/airport", airportRouter);
app.use("/flightSearch/v1/airportIata", airportIataRouter);

//airlabsAPI
app.use("/flightSearch/v1/airlabs", airLabsRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//error handling middleware
app.use(globalErrorHandler);

module.exports = app;
