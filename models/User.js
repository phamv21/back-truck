const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  permission: {
    type: String,
    required: true,
    default: 'reporter'
  }
}, {
  timestamps: true
})
module.exports = User = mongoose.model('User', UserSchema);
