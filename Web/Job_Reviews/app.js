/* TO-DO:
  - Remove morgan package
*/
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
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const morgan = require("morgan");
// const session = require("express-session");
const sass = require("sass");

// const MongoDBStore = require("connect-mongo")(session);

/************************
 * EXPRESS
 ************************/
// listen to port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serving on port ${port}...`);
});

/*
// 404 error
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});
*/

/*
// 500 error
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});
*/
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
// set default engine to parse EJS files
app.engine("ejs", ejsMate);

// set path for parsing ejs files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// set path for serving public folder
app.use(express.static(path.join(__dirname, "public")));

// parse data into url
app.use(express.urlencoded({ extended: true }));

// overrides form action methods
app.use(methodOverride("_method"));

/* logger middleware
  green = success, red = server error, yellow = client error, cyan = redirection, uncolored = information
*/
app.use(morgan("dev"));

// render code from home.ejs
app.get("/", (req, res) => {
  res.render("home");
});

// render list of jobs page
app.get("/jobs", async (req, res) => {
  const jobs = await Job.find({});
  res.render("jobs/index", { jobs });
});

/***** CRUD Operation *****/

// render CREATE new job page
app.get("/jobs/new", (req, res) => {
  res.render("jobs/new");
});

// post new job
app.post("/jobs", async (req, res) => {
  const job = new Job(req.body.job);
  await job.save();
  res.redirect(`/jobs/${job._id}`);
});

// render page to READ job
app.get("/jobs/:id", async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.render("jobs/show", { job });
});

// render page to UPDATE job
app.get("/jobs/:id/edit", async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.render("jobs/edit", { job });
});

// put method to overwrite job
app.put("/jobs/:id", async (req, res) => {
  // destructure array to get job id
  const { id } = req.params;
  const job = await Job.findByIdAndUpdate(id, { ...req.body.job }); // spread object into object
  res.redirect(`/jobs/${job._id}`);
});

// DELETE job
app.delete("/jobs/:id", async (req, res) => {
  // destructure array to get job id
  const { id } = req.params;
  await Job.findByIdAndRemove(id);
  res.redirect("/jobs");
});

/************************
 * TAILWINDCSS
 ************************/
