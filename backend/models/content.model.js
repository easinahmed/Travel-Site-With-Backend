const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'site-content',
      unique: true
    },
    sections: {
      type: Object,
      required: true,
      default: {}
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Content', contentSchema);
