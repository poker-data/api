const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
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
  delete: {
    type: Boolean,
    default: false,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
