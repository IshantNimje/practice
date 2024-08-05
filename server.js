const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;


mongoose.connect(mongoURI, {
});

const Note = require('./models/Note');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/notes', require('./api/notes'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
