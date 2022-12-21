const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const wishlistSchema = mongoose.Schema({
    organizerUserName: {
        type: String,
        required: true,

    },
    products: {
        type: [{ product_name: String, company_name: String, description:  String, rent_price: Number }],
        required: true
    }
});
const wishlist = (module.exports = mongoose.model("wishlist", wishlistSchema));