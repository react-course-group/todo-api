const mongoose = require('mongoose')

module.exports = mongoose.model('User', new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  tasks: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Task'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
}))