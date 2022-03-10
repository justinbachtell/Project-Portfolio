/************************
 * DOTENV
 ************************/
const dotenv = require("dotenv").config();

/************************
 * CORE VARIABLES
 ************************/
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
// const ejsMate = require("ejs-mate");
// const session = require("express-session");

// const MongoDBStore = require("connect-mongo")(session);

/************************
 * EXPRESS
 ************************/
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
 * MONGOOSE
 ************************/
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
 * REMBEDDED JAVASCRIPT TEMPLATES (EJS)
 ************************/
// set path
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// parse data into url
app.use(express.urlencoded({ extended: true }));

// overrides form action methods
app.use(methodOverride("_method"));

// render code from home.ejs
app.get("/", (req, res) => {
  res.render("home");
});

// render list of jobs page
app.get("/jobs", async (req, res) => {
  const jobs = await Job.find({});
  res.render("jobs/index", { jobs });
});

// render create new job page
app.get("/jobs/new", (req, res) => {
  res.render("jobs/new");
});

// post new job
app.post("/jobs", async (req, res) => {
  const job = new Job(req.body.job);
  await job.save();
  res.redirect(`/jobs/${job._id}`);
});

// render page to view job
app.get("/jobs/:id", async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.render("jobs/show", { job });
});

app.get("/jobs/:id/edit", async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.render("jobs/edit", { job });
});

/************************
 * TAILWINDCSS
 ************************/
