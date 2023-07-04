const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const playerStatistics = new Schema({
  tempStats: {
    type: String,
    ref: "tempStats"
  },
  playerName: {
    type: String,
    ref: "playerName"
  },
  delete: {
    type: Boolean,
    default: false,
    required: false
  }
});
module.exports = mongoose.model("playerStatistics", playerStatistics);