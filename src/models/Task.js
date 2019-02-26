const mongoose = require('mongoose')

module.exports = mongoose.model('Task', new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }, 
  content: {
    type: String,
    required: true,
    minLength: 3
  },
  done: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
}))

