const express = require("express");
const Wishlist = require('../schemas/wishlist_schema.js');
const Product  = require('../schemas/product_schema.js');

const router = express.Router();

// POST REQUEST FOR UPDATING USER DATA

router.post('/addToWishlist', async (req, res) => {
    const { organizerUserName, product_name,  company_name, description, rent_price } = req.body;

    const newProduct = new Product({ product_name, company_name, description, rent_price, description });
    const existingWishlist = await Wishlist.findOne({ organizerUserName });

    // If there already exists a wishlist for that organizer
    if (existingWishlist) {
        existingWishlist.products.push(newProduct);
        existingWishlist.save((err) => {
            if (err) {
                return res.json({ status: 'error', error: 'existWishlist not saved' })
            } else {
                return res.json({ status: 'success'})
            }
        });
    // otherwise, we create a wishlist
    } else {
        const products = [];
        products.push(newProduct);
        console.log(products);
        const newWishlist = new Wishlist({ organizerUserName, products });
        newWishlist.save((err) => {
            if (err) {
                console.log(err);
                return res.json({ status: 'error', error: 'newWishlist not saved' })
            } else {
                return res.json({ status: 'success'})
            }
        });
    }
  })


  router.post('/getWishlistContent', async (req, res) => {
    const username = req.body.organizerUserName;
    let wishlist = await Wishlist.findOne({ organizerUserName: username }).lean();
    if (wishlist) {
        res.send({ payload: wishlist.products });
    } else {
        return res.json({ status: 'error', error: 'wishlist empty' });
    }
  })


  module.exports = router;