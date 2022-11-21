const mongoose = require("mongoose");
const organizerSchema = mongoose.Schema({
  person_name: {
    type: String,
    required: true
  }, 
  telnr: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});
const organizer = (module.exports = mongoose.model("organizer", organizerSchema));