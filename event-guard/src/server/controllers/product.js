const express = require("express");
const Product = require('../schemas/product_schema.js');

const router = express.Router();

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

/*router.get('/getOwnProducts', async (req, res) => {
    let searchProducts = await Product.find({companyName: "Scouts Brussel"});
    res.send({ payload: searchProducts });
  })
  */

module.exports = router;
