const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  playerName: {
    type: String,
    required: true,
  },
  shkUsername: {
    type: String,
    // required: true,
    unique: true,
  },
  delete: {
    type: Boolean,
    default: false,
    required: false,
  },
});


module.exports = mongoose.model("Player", playerSchema);
