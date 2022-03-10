/************************
 * REQUIRED MODULES
 ************************/
/***** MONGOOSE *****/
const mongoose = require("mongoose");

// build schema
const Schema = mongoose.Schema;

// job schema
const jobSchema = new Schema({
  title: String,
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
  dateposted: Date,
  skills: [String],
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
  salary: String,
  description: String,
  location: String,
  ratings: {
    overallRating: Number,
    cultureValues: Number,
    diversity: Number,
    worklifeBalance: Number,
    management: Number,
    compensationBenefits: Number,
    careerOpportunities: Number,
  },
  reviews: {
    type: Schema.Types.ObjectId,
    ref: "Review",
  },
});

module.exports = mongoose.model("Job", jobSchema);
