const express = require("express");
const Organizer = require('../schemas/organizer_schema.js');

const router = express.Router();

// POST REQUEST FOR UPDATING USER DATA

router.post('/updateOrganizer', (req, res) => {
    let usernameString = req.body.username;
    // array of data
    let data = req.body.data;
    let filter = { username: usernameString };
    let new_values = { $set: {name: data[0], telnr: data[1], email: data[2], username: data[3]}};
    Organizer.updateOne(filter, new_values, function(err) {
      if (err) {
        return res.json({ status: 'error', error: 'Something went wrong.' })
      } else { return res.json({ status: 'success' }) }
    });
  })


  module.exports = router;