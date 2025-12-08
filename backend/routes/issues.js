const router = require('express').Router();
const Issue = require('../models/Issue');
const Book = require('../models/Book');

router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find({ status: 'issued' });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const issue = new Issue(req.body);
    await issue.save();
    await Book.findOneAndUpdate({ name: req.body.bookName }, { available: false });
    res.json(issue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id/return', async (req, res) => {
  try {
    const { actualReturnDate, fine, finePaid, remarks } = req.body;
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { actualReturnDate, fine, finePaid, remarks, status: 'returned' },
      { new: true }
    );
    await Book.findOneAndUpdate({ name: issue.bookName }, { available: true });
    res.json(issue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/overdue', async (req, res) => {
  try {
    const today = new Date();
    const issues = await Issue.find({ 
      status: 'issued',
      returnDate: { $lt: today }
    });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
