const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Booking', bookingSchema)