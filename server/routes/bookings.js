const express = require('express')
const Booking = require('../models/Booking')
const router = express.Router()

router.post('/', async (req, res) => {
  const booking = new Booking(req.body)
  try {
    const newBooking = await booking.save()
    res.status(201).json(newBooking)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router