const express = require("express");
const Review = require('../schemas/review_schema.js');

const router = express.Router();

// POST REQUEST FOR ADDING A USER REVIEW

router.post("/addReview", (req, res) => {
    const { username, rating,  nameCompany, date, description } = req.body;

    const new_review = new Review({ username, rating, nameCompany, date, description });

    if (new_review != null) {
        new_review.save((err) => {
          if (err) {
            return res.json({ status: 'error', error: err })
          } else {
            return res.json({ status: 'success' })
          }
        })
      } else { console.log("failed");}
})


// GET REQUEST FOR GETTING THE LAST TEN USER REVIEWS

router.get('/getReviews', async (req, res) => {
  let search = await Review.find().sort({ date: 1 }).limit(10);
  res.send({ payload: search });
})


module.exports = router;