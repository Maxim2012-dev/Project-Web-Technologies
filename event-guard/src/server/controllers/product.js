const express = require("express");
const Product = require('../schemas/product_schema.js');

const router = express.Router();

// POST REQUEST FOR ADDING NEW PRODUCT FROM SPECIFIC COMPANY

router.post("/addProduct", (req, res) => {
    const { product_name, company_name, description, rent_price } = req.body;

    const new_product = new Product({ product_name, company_name, description, rent_price, });

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

// POST REQUEST FOR GETTING PROVIDERS PRODUCTS BASED ON SEARCH INPUT

router.post('/getProducts', async (req, res) => {
  const company_name = req.body.company_name;
  const keyValue     = req.body.keyValue.trim();
  console.log(company_name, keyValue);
  let search = await Product.find({ company_name: company_name, product_name: {$regex: new RegExp('^'+keyValue+'.*','i')}}).exec();
  search = search.slice(0, 10);
  console.log(search);
  res.send({ payload: search });
})

// POST REQUEST FOR GETTING THE PRODUCTS FROM ONE SPECIFIC COMPANY

router.post('/getOwnProducts', async (req, res) => {
    const username = req.body.username;
    let searchProducts = await Product.find({ company_name: username });
    res.send({ payload: searchProducts });
})


module.exports = router;
