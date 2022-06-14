const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    // required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    // required: true,
  },
  mainAddress: {
    type: String,
    ref: "Address",
  },
  city: {
    type: String,
    ref: "City",
  },
  delete: {
    type: Boolean,
    default: false,
    required: false,
  },
});


module.exports = mongoose.model("Customer", customerSchema);
