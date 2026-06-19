const express = require('express');
const DiaryEntry = require('../models/DiaryEntry');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create entry
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, encryptedContent, date } = req.body;

    if (!title || !encryptedContent) {
      return res.status(400).json({ message: 'Title and content required' });
    }

    const entry = new DiaryEntry({
      userId: req.userId,
      title,
      encryptedContent,
      date: date || Date.now()
    });

    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all entries for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const entries = await DiaryEntry.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get single entry
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const entry = await DiaryEntry.findOne({ _id: req.params.id, userId: req.userId });

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update entry
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, encryptedContent, date } = req.body;

    let entry = await DiaryEntry.findOne({ _id: req.params.id, userId: req.userId });

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    entry.title = title || entry.title;
    entry.encryptedContent = encryptedContent || entry.encryptedContent;
    entry.date = date || entry.date;
    entry.updatedAt = Date.now();

    await entry.save();
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete entry
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const entry = await DiaryEntry.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
