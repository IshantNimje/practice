const express = require('express');
const Note = require('../models/Note');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, date, category } = req.body;
    const newNote = new Note({
      title,
      description,
      date,
      category,
    });
    await newNote.save();
    res.status(201).json({ message: 'Data has been inserted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, category } = req.body;
    await Note.findByIdAndUpdate(id, {
      title,
      description,
      date,
      category,
    });
    res.status(200).json({ message: 'Data has been edited successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: 'Data has been deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      res.status(404).json({ error: 'Note not found' });
    } else {
      res.status(200).json(note);
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
