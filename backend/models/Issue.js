const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  bookName: { type: String, required: true },
  author: { type: String, required: true },
  serialNo: { type: String, required: true },
  issueDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  actualReturnDate: { type: Date },
  remarks: { type: String },
  fine: { type: Number, default: 0 },
  finePaid: { type: Boolean, default: false },
  status: { type: String, enum: ['issued', 'returned'], default: 'issued' }
}, { timestamps: true });

module.exports = mongoose.model('Issue', issueSchema);
