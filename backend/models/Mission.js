const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
  vision: {
    type: String,
    required: true
  },
  mission: {
    type: String,
    required: true
  },
  values: [{
    title: String,
    description: String
  }],
  bibleVerse: {
    text: String,
    reference: String
  },
  history: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Mission', missionSchema);