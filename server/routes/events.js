const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1, time: 1 });  
    res.json(events);
  } catch (err) {
    console.error('Error fetching all events:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;