const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    notes: { type: String },
    format: { type: String, required: true },
    organizer: { type: String }, 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Event', eventSchema);
