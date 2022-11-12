const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    unique: true, // `email` must be unique
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
   shkUsername: {
    type: String,
    // required: true,
    unique: true,
  },
  playerLevel: {
    type: Number,
   },
  delete: {
    type: Boolean,
    default: false,
    required: false,
  },
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
