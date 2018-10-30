const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/db');

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

// const Schema = mongoose.Schema({
// });

// const dataSets = mongoose.model('dataSets', Schema);

// module.exports = {
// };
