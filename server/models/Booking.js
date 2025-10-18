const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  date: String, 
  time: String, 
  guests: Number,
  name: String,
  phone: String,
});
module.exports = mongoose.model('Booking', bookingSchema);
