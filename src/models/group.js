const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  groupName: {
    type: String,
    required: true,
  },
  delete: {
    type: Boolean,
    default: false,
    required: false,
  },
});


module.exports = mongoose.model("Group", groupSchema);