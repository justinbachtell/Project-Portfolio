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
// function to generate random number between 0 and num
const randomNum = (num) => {
  let random = Math.floor(Math.random() * num + 1);
  return random;
};

// function to generate a Job from seeds
const seedDb = async () => {
  // delete database of jobs
  await Job.deleteMany({});

  // number of random jobs to generate
  let n = 3;

  // loop to generate n number of random jobs
  for (let i = 0; i < n; i++) {
    // generate random index position for job
    const randomJob = Math.floor(Math.random() * positions.length);

    // generate random index position for city
    const randomCity = Math.floor(Math.random() * cities.length);

    // generate random skills
    const shuffledSkills = [...skills].sort(() => 0.5 - Math.random());
    let selectedSkills = shuffledSkills.slice(0, randomNum(3));

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

    // calculate overvall rating of all ratings
    const overallRating = (arr) => {
      const sum = 0;
      for (let i = 0; i < arr.length; i++) {
        sum += Number(arr[i]);
      }
      return sum / arr.length;
    };

    // generate random job from Job model
    const job = new Job({
      title: `${positions[randomJob]}`,
      skills: `${selectedSkills}`,
      salary: `${randomSalary(180000)}`,
      location: `${cities[randomCity].city}, ${cities[randomCity].state}`,
      ratings: {
        cultureValues: `${randomNum(5)}`,
        diversity: `${randomNum(5)}`,
        worklifeBalance: `${randomNum(5)}`,
        management: `${randomNum(5)}`,
        compensationBenefits: `${randomNum(5)}`,
        careerOpportunities: `${randomNum(5)}`,
      },
    });
    await job.save();
  }
};

// close database connection after it is started
seedDb().then(() => {
  mongoose.connection.close();
});
