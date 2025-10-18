const express = require('express')
const Menu = require('../models/Menu')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const items = await Menu.find()
    res.json(items)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


module.exports = router