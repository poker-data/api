const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stakeRangeSchema = new Schema({
  level: {
    type: String,
    required: true,
    unique: true,
   },
  stakeRange: {
    type: String,
    required: true,
  },
  delete: {
    type: Boolean,
    default: false,
    required: false,
  },
});

module.exports = mongoose.model('stakeRange', stakeRangeSchema);
