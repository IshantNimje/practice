const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  category: String,
});

module.exports = mongoose.model('Note', noteSchema);
