const express = require("express");
const Product = require('../schemas/product_schema.js');

const router = express.Router();

// POST REQUEST FOR ADDING NEW PRODUCT FROM SPECIFIC COMPANY

router.post("/addProduct", (req, res) => {
    const { product_name, description, rent_price, details} = req.body;

    const new_product = new Product({ product_name, description, rent_price, details});

    if (new_product != null) {
        new_product.save((err) => {
          if (err) {
            return res.json({ status: 'error', error: err })
          } else {
            return res.json({ status: 'success' })
          }
        })
      } else { console.log("failed");}
})


// POST REQUEST FOR GETTING THE PRODUCTS FROM ONE SPECIFIC COMPANY

router.post('/getOwnProducts', async (req, res) => {
    const name = req.body.company_name;
    let searchProducts = await Product.find({ companyName: name });
    res.send({ payload: searchProducts });
})


module.exports = router;
