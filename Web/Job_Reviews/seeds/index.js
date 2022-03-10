/************************
 * DOTENV
 ************************/
const dotenv = require("dotenv").config();

/************************
 * MONGOOSE
 ************************/
const mongoose = require("mongoose");

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
 * VARIABLES
 ************************/

const cities = require("./cities");
const { positions, skills } = require("./seedHelpers");
const Job = require("../models/job");

/************************
 * RANDOMIZE JOB WITH DESCRIPTORS
 ************************/
// function to generate random salary amount
const randomSalary = (num) => {
  let salary = Math.floor(Math.random() * num);

  if (salary < 10000) {
    salary += 20000;
  } else if (salary < 20000) {
    salary += 15000;
  } else if (salary < 30000) {
    salary += 5000;
  }

  return salary;
};

const randomNum = (num) => {
  let random = Math.floor(Math.random() * num + 1);
  return random;
};

// function to generate a number of random skills
const randomSkills = (array, num) => {
  let randomSkill = [];

  let random = Math.floor(Math.random() * num + 1);

  switch (random) {
    case 1:
      randomSkill.push(array[Math.floor(Math.random() * array.length)]);
      break;
    case 2:
      randomSkill.push(array[Math.floor(Math.random() * array.length)]);
      randomSkill.push(array[Math.floor(Math.random() * array.length)]);
      break;
  }
  return randomSkill;
};

const seedDb = async () => {
  await Job.deleteMany({});
  for (let i = 0; i < 5; i++) {
    // generate random index position for job
    const randomJob = Math.floor(Math.random() * positions.length);

    // generate random index position for city
    const randomCity = Math.floor(Math.random() * cities.length);

    const job = new Job({
      title: `${positions[randomJob]}`,
      location: `${cities[randomCity].city}, ${cities[randomCity].state}`,
      salary: `${randomSalary(180000)}`,

      skills: `${randomSkills(skills, 3)}`,
    });
    await job.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});
