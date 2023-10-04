const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  // flight: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "Flight",
  //   required: [true, "favorite must belong to a flight!"],
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
    default: "Economy",
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
  flight_iata: {
    type: String,
    required: [true, "A Favorite must have a flight iata code"],
  },

  airlineFullName: String,

  status: String,
  duration: {
    type: Number,
    required: [true, "A Favorite must have a duration"],
  },

  //ADDITONAL INFO
  dep_terminal: String,
  arr_terminal: String,
});

// find時自動populate user
favoriteSchema.pre(/^find/, function (next) {
  this.populate("user");
  next();
});

const favorite = mongoose.model("Favorite", favoriteSchema);
module.exports = favorite;
