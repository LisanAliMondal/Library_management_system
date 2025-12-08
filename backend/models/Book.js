const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  type: { type: String, enum: ['book', 'movie'], default: 'book' },
  serialNo: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  cost: { type: String, required: true },
  procurementDate: { type: Date, required: true },
  available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
