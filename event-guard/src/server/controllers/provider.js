const express = require("express");
const Provider = require('../schemas/company_schema.js');

const router = express.Router();


// POST REQUEST FOR SEARCH BAR RESULTS

router.post('/getCompanies', async (req, res) => {
    let payload = req.body.keyValue.trim();
    let search = await Provider.find({ name: {$regex: new RegExp('^'+payload+'.*','i')}}).exec();
    search = search.slice(0, 10);
    res.send({ payload: search });
  })


// GET REQUEST FOR GETTING ALL THE COMPANIES

router.get('/getAllCompanyAddresses', async (req, res) => {
  let results = await Provider.find().select('name address');
  res.send({ payload: results });
})


  module.exports = router;