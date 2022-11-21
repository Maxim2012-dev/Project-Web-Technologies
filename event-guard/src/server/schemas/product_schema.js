const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  product_name: {
    type: String,
    required: true
  }, 
  type: {
    type: String,
    required: true
  },
  rent_price: {
    type: Number,
    required: true
  }
});
const product = (module.exports = mongoose.model("product", productSchema));