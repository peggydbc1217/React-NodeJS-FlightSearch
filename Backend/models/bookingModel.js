const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  // flight: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "Flight",
  //   required: [true, "Booking must belong to a flight!"],
  // },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Booking must belong to a user!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: false,
  },
  unit: {
    type: String,
    default: "USD",
  },
  amount: {
    type: Number,
    default: 1,
    required: [true, "A booking must have at least 1 passenger"],
    maxLength: [10, "A booking cannot be more than 10 passengers"],
  },
  price: {
    type: Number,
    required: [true, "A booking must have a price"],
  },
  flightClass: {
    type: String,
    enums: ["Economy", "Premium Economy", "Business", "First Class"],
    required: [true, "A booking must have a class"],
  },

  //ARR
  arr_iata: String,
  arr_name: String,
  arr_country: String,
  arr_city: String,
  arr_time: Date,

  //DEP
  dep_iata: String,
  dep_name: String,
  dep_country: String,
  dep_city: String,
  dep_time: Date,

  // ARILINE AND FLIGHT
  airline_iata: String,
  flight_iata: String,
  airlineFullName: String,

  status: String,
  duration: {
    type: Number,
    required: [true, "A booking must have a duration"],
  },

  // FROM PASSERGER INFO
  surname: String,
  givenName: String,
  email: String,

  //ADDITONAL INFO
  dep_terminal: String,
  arr_terminal: String,

  // email: String,
  // surname: String,
  // givenName: String,

  // dep_gate: String,
  // arr_gate: String,

  //BELOW IS TO REFER TO THE FLIGHT MODEL
  //   airline_iata(pin):"AI"
  // flight_iata(pin):"AI7063"
  // dep_terminal(pin):"2"
  // dep_iata(pin):"TPE"
  // dep_time(pin):"2023-09-07 20:45"
  // arr_iata(pin):"BKK"
  // arr_time(pin):"2023-09-07 23:30"
  // status(pin):"scheduled"
  // duration(pin):225
  // price(pin):"325.00"
  // airlineFullName(pin):"Air India Limited"
  // arr_name(pin):"Suvarnabhumi Airport"
  // arr_country(pin):"TH"
  // dep_name(pin):"Taiwan Taoyuan International Airport"
  // dep_country(pin):"TW"
  // arr_city(pin):"Bangkok"
  // dep_city(pin):"Taipei"
  // user(pin):"60b9b0b3e6b6b30015f9b0a0"
});

// Define a virtual property for totalPrice
bookingSchema.virtual("totalPrice").get(function () {
  return this.amount * this.price;
});

// find時自動populate user
bookingSchema.pre(/^find/, function (next) {
  this.populate("user");
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
