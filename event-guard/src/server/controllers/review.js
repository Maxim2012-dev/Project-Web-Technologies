const express = require("express");
const Review = require('../schemas/review_schema.js');

const router = express.Router();

// POST REQUEST FOR ADDING A USER REVIEW

router.post("/addReview", (req, res) => {
    const { nameUser, rating,  nameCompany, date, description } = req.body;

    const new_review = new Review({ nameUser, rating, nameCompany, date, description });

    if (new_review != null) {
        new_review.save((err) => {
          if (err) {
            return res.json({ status: 'error', error: 'Something went wrong.' })
          } else {
            return res.json({ status: 'success' })
          }
        })
      } else { console.log("failed");}
})

module.exports = router;