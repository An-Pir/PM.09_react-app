const express = require('express')
const Review = require('../models/Review')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find()
    res.json(reviews)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  const review = new Review(req.body)
  try {
    const newReview = await review.save()
    res.status(201).json(newReview)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router