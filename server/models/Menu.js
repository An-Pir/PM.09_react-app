const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
  id:        { type: String, required: true, unique: true }, 
  name:      { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: String, default: "" }, 
  price:     { type: Number, required: true },
  category:  { 
    type: String, 
    enum: ['кофе', 'десерты', 'завтраки', 'книги'], 
    required: true 
  },
  img:       { type: String, required: true }, 
  tags:      { type: [String], default: [] }
})

module.exports = mongoose.model('Menu', menuSchema)