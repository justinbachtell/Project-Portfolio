/************************
 * DOTENV
 ************************/
const dotenv = require("dotenv").config();

/************************
 * EXPRESS
 ************************/
const express = require("express");
const app = express();

// listen to port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serving on port ${port}...`);
});

// convert http request to js object
app.get("/", (req, res) => {
  res.send("HTTP conversion successful.");
});

/************************
 * REMBEDDED JAVASCRIPT TEMPLATES (EJS)
 ************************/
const path = require("path");

// set path
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// render code from index.ejs
app.get("/", (req, res) => {
  res.render("index");
});

//
app.get("/makejob", async (req, res) => {
  const job = new Job({ title: "My Job", description: "The best job" });
  await job.save();
  res.send(job);
});

/************************
 * MONGOOSE
 ************************/
const mongoose = require("mongoose");
const Job = require("./models/job");

// connect to mongodb
const mongodb =
  process.env.mongodbURL || "mongodb//localhost:27017/job-reviews";
mongoose.connect(mongodb);

// connection checker
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connected.");
});

/************************
 * TAILWINDCSS
 ************************/
