const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const mongoose = require("mongoose");
const AirportSchedule = require("../models/airportScheduleModel");
//DB
console.log(process.env.DATABASE);
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() =>
    console.log("DB connection successful! Ready to send local data to DB!")
  );

//READ JSON FILE
const airports = JSON.parse(
  fs.readFileSync(`${__dirname}/airportScheduleData.json`, "utf-8")
);

//function to import data into DB

const importData = async () => {
  try {
    await AirportSchedule.create(airports);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
};

// Delete all data from DB
const deleteData = async () => {
  try {
    await AirportSchedule.deleteMany();
    console.log("Data successfully deleted!");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// do the import and delete

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
