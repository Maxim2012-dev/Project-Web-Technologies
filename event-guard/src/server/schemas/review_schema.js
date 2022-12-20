const mongoose = require("mongoose");
const reviewSchema = mongoose.Schema({
  nameUser: {
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
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});
const review = (module.exports = mongoose.model("review", reviewSchema));