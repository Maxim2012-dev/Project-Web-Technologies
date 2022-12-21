const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  product_name: {
    type: String,
    required: true
  }, 
  company_name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rent_price: {
    type: String,
    required: true
  },
});
const product = (module.exports = mongoose.model("product", productSchema));
