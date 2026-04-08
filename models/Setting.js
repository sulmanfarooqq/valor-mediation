const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  key: {
    type: String,
    required: [true, 'Please provide a key'],
    unique: true,
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, 'Please provide a value'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Setting', settingSchema);