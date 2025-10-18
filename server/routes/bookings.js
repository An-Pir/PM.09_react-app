const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

router.post('/', async (req, res) => {
  try {
    const { date, time } = req.body;

    const exists = await Booking.findOne({ date, time });
    if (exists) {
      return res.status(409).json({ message: 'На это время уже есть бронь!' });
    }

    const booking = await Booking.create(req.body);
    res.status(201).json({ message: 'Бронирование создано!', booking });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера', error: err.toString() });
  }
});

module.exports = router;
