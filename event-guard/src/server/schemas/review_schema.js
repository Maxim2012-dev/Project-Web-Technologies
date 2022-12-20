const mongoose = require("mongoose");
const reviewSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  }, 
  rating: {
    type: Number,
    required: true
  },
  nameCompany: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});
const review = (module.exports = mongoose.model("review", reviewSchema));