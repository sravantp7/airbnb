const mongoose = require('mongoose')

// schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

// model
const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
