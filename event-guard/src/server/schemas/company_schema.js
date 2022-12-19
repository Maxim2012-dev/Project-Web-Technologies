const mongoose = require("mongoose");
const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  address: {
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
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});
const company = (module.exports = mongoose.model("company", companySchema));