const mongoose = require('mongoose')

// USER SCHEMA
let userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: String
})

// USER MODEL
let User = mongoose.model('User', userSchema)

module.exports = User