const mongoose = require('mongoose');
const { DB } = require('../constants/constants');
mongoose.connect(DB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database! ...');
});
